/**
 * Prenatal Clinical Atlas — Hyper-Realistic Interactive 3D Embryology Engine
 * ---------------------------------------------------------------------------
 * Dependency-free WebGL renderer + anatomical SDF sculptor + live OB Doppler.
 *
 * - Models are sculpted per gestational week from hierarchical signed-distance
 *   anatomical groups (craniofacial/torso core, independent upper-limb rigs
 *   with unwebbed 5-ray hands, independent lower-limb rigs with unwebbed 5-ray
 *   feet) and meshed with Naive Surface Nets + SDF-projected Laplacian
 *   relaxation for silky-smooth, organic, artifact-free infant anatomy.
 * - Per-vertex SDF-baked optical thickness & anatomical crease ambient
 *   occlusion (`aSurface`: [thickness, ao]) drive physically inspired
 *   subsurface scattering (`exp(-thickness * sigma_rgb)`) through thin
 *   tissue (ears, fingers, toes, nostrils, early embryo body wall) and
 *   soft warm peach-umber shading in natural skin folds.
 * - Screen-space derivative micro-normal mapping (`OES_standard_derivatives`),
 *   delicate subcutaneous vascular networks, dual-lobe wet vernix clearcoat,
 *   Fresnel-only crystal-clear amniotic membrane, volumetric intrauterine
 *   backlighting, and 3D floating amniotic fluid particles.
 * - Interactive & Fun: 60 FPS distortion-free in-utero fetal movements
 *   (gentle amniotic buoyancy, ribcage breathing, and lower-limb kick reflex),
 *   click/tap or button-triggered "Gentle Kick" reflex with amniotic ripple,
 *   and live synthesized OB ultrasound Doppler heartbeat audio (`Web Audio API`).
 *
 * Security: zero innerHTML / string-built DOM; every element and shader is
 * created via safe DOM / WebGL / WebAudio APIs. No network access, no external
 * assets.
 */
(function initAtlas3D(globalScope) {
  'use strict';

  const PI = Math.PI;

  /* ======================================================================
     Small vector helpers (arrays of 3 numbers)
     ====================================================================== */
  function vAdd(a, b) { return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]; }
  function vSub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function vScale(a, s) { return [a[0] * s, a[1] * s, a[2] * s]; }
  function vMadd(a, b, s) { return [a[0] + b[0] * s, a[1] + b[1] * s, a[2] + b[2] * s]; }
  function vDot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function vCross(a, b) {
    return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  }
  function vLen(a) { return Math.sqrt(vDot(a, a)); }
  function vNorm(a) { const l = vLen(a) || 1; return [a[0] / l, a[1] / l, a[2] / l]; }
  function vLerp(a, b, t) {
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
  }
  function clamp(x, lo, hi) { return x < lo ? lo : (x > hi ? hi : x); }
  function lerp(a, b, t) { return a + (b - a) * t; }

  /* ======================================================================
     Column-major 4x4 matrices (WebGL convention)
     ====================================================================== */
  function m4Identity() {
    return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  }
  function m4Mul(a, b) {
    const o = new Float32Array(16);
    for (let c = 0; c < 4; c += 1) {
      for (let r = 0; r < 4; r += 1) {
        o[c * 4 + r] = a[r] * b[c * 4] + a[4 + r] * b[c * 4 + 1] + a[8 + r] * b[c * 4 + 2] + a[12 + r] * b[c * 4 + 3];
      }
    }
    return o;
  }
  function m4Translate(t) { const m = m4Identity(); m[12] = t[0]; m[13] = t[1]; m[14] = t[2]; return m; }
  function m4Scale(s) { const m = m4Identity(); m[0] = s[0]; m[5] = s[1]; m[10] = s[2]; return m; }
  function m4FromBasis(u, v, w, c) {
    return new Float32Array([u[0], u[1], u[2], 0, v[0], v[1], v[2], 0, w[0], w[1], w[2], 0, c[0], c[1], c[2], 1]);
  }
  function m4RotX(a) {
    const c = Math.cos(a), s = Math.sin(a);
    return new Float32Array([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]);
  }
  function m4RotY(a) {
    const c = Math.cos(a), s = Math.sin(a);
    return new Float32Array([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]);
  }
  function m4RotZ(a) {
    const c = Math.cos(a), s = Math.sin(a);
    return new Float32Array([c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  }
  function m4Perspective(fovy, aspect, near, far) {
    const f = 1 / Math.tan(fovy / 2);
    const nf = 1 / (near - far);
    const m = new Float32Array(16);
    m[0] = f / aspect; m[5] = f; m[10] = (far + near) * nf; m[11] = -1; m[14] = 2 * far * near * nf;
    return m;
  }
  function m4LookAt(eye, center, up) {
    const z = vNorm(vSub(eye, center));
    const x = vNorm(vCross(up, z));
    const y = vCross(z, x);
    return new Float32Array([
      x[0], y[0], z[0], 0,
      x[1], y[1], z[1], 0,
      x[2], y[2], z[2], 0,
      -vDot(x, eye), -vDot(y, eye), -vDot(z, eye), 1
    ]);
  }
  function m4Invert(a) {
    const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    const a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    const a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    const a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    const b00 = a00 * a11 - a01 * a10, b01 = a00 * a12 - a02 * a10, b02 = a00 * a13 - a03 * a10;
    const b03 = a01 * a12 - a02 * a11, b04 = a01 * a13 - a03 * a11, b05 = a02 * a13 - a03 * a12;
    const b06 = a20 * a31 - a21 * a30, b07 = a20 * a32 - a22 * a30, b08 = a20 * a33 - a23 * a30;
    const b09 = a21 * a32 - a22 * a31, b10 = a21 * a33 - a23 * a31, b11 = a22 * a33 - a23 * a32;
    let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if (!det) return null;
    det = 1 / det;
    const o = new Float32Array(16);
    o[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    o[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    o[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    o[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    o[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    o[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    o[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    o[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    o[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    o[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    o[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    o[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    o[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    o[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    o[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    o[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
    return o;
  }
  function m3NormalFromM4(m) {
    const inv = m4Invert(m) || m4Identity();
    return new Float32Array([inv[0], inv[4], inv[8], inv[1], inv[5], inv[9], inv[2], inv[6], inv[10]]);
  }
  function m4TransformPoint(m, p) {
    return [
      m[0] * p[0] + m[4] * p[1] + m[8] * p[2] + m[12],
      m[1] * p[0] + m[5] * p[1] + m[9] * p[2] + m[13],
      m[2] * p[0] + m[6] * p[1] + m[10] * p[2] + m[14]
    ];
  }

  /* ======================================================================
     Deterministic noise (CPU side, used for displacement & placement)
     ====================================================================== */
  function mulberry32(seed) {
    let a = seed >>> 0;
    return function next() {
      a = (a + 0x6D2B79F5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function hash3(ix, iy, iz) {
    let h = (ix * 374761393 + iy * 668265263 + iz * 1442695041) | 0;
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  }
  function valueNoise3(x, y, z) {
    const ix = Math.floor(x), iy = Math.floor(y), iz = Math.floor(z);
    let fx = x - ix, fy = y - iy, fz = z - iz;
    fx = fx * fx * (3 - 2 * fx); fy = fy * fy * (3 - 2 * fy); fz = fz * fz * (3 - 2 * fz);
    const c000 = hash3(ix, iy, iz), c100 = hash3(ix + 1, iy, iz);
    const c010 = hash3(ix, iy + 1, iz), c110 = hash3(ix + 1, iy + 1, iz);
    const c001 = hash3(ix, iy, iz + 1), c101 = hash3(ix + 1, iy, iz + 1);
    const c011 = hash3(ix, iy + 1, iz + 1), c111 = hash3(ix + 1, iy + 1, iz + 1);
    const x00 = lerp(c000, c100, fx), x10 = lerp(c010, c110, fx);
    const x01 = lerp(c001, c101, fx), x11 = lerp(c011, c111, fx);
    return lerp(lerp(x00, x10, fy), lerp(x01, x11, fy), fz);
  }
  function fbm3(x, y, z, octaves) {
    let v = 0, amp = 0.5, f = 1;
    for (let i = 0; i < octaves; i += 1) {
      v += amp * valueNoise3(x * f + 7.1 * i, y * f + 3.3 * i, z * f + 1.9 * i);
      amp *= 0.5; f *= 2.05;
    }
    return v;
  }

  /* ======================================================================
     Mesh builders
     ====================================================================== */
  function createMesh(positions, normals, indices, surfaceData) {
    const vCount = positions.length / 3;
    let surf = surfaceData;
    if (!surf) {
      surf = new Float32Array(vCount * 2);
      for (let i = 0; i < vCount; i += 1) {
        surf[i * 2] = 0.52;
        surf[i * 2 + 1] = 1.0;
      }
    }
    return { positions: positions, normals: normals, indices: indices, surface: surf, vertexCount: vCount, gpu: null, shared: false };
  }

  function recomputeNormals(mesh) {
    const p = mesh.positions, idx = mesh.indices;
    const n = new Float32Array(p.length);
    for (let t = 0; t < idx.length; t += 3) {
      const a = idx[t] * 3, b = idx[t + 1] * 3, c = idx[t + 2] * 3;
      const e1x = p[b] - p[a], e1y = p[b + 1] - p[a + 1], e1z = p[b + 2] - p[a + 2];
      const e2x = p[c] - p[a], e2y = p[c + 1] - p[a + 1], e2z = p[c + 2] - p[a + 2];
      const nx = e1y * e2z - e1z * e2y, ny = e1z * e2x - e1x * e2z, nz = e1x * e2y - e1y * e2x;
      n[a] += nx; n[a + 1] += ny; n[a + 2] += nz;
      n[b] += nx; n[b + 1] += ny; n[b + 2] += nz;
      n[c] += nx; n[c + 1] += ny; n[c + 2] += nz;
    }
    for (let i = 0; i < n.length; i += 3) {
      const l = Math.sqrt(n[i] * n[i] + n[i + 1] * n[i + 1] + n[i + 2] * n[i + 2]) || 1;
      n[i] /= l; n[i + 1] /= l; n[i + 2] /= l;
    }
    mesh.normals = n;
  }

  function ensureOutwardWinding(mesh) {
    const p = mesh.positions, idx = mesh.indices, count = mesh.vertexCount;
    let cx = 0, cy = 0, cz = 0;
    for (let i = 0; i < p.length; i += 3) { cx += p[i]; cy += p[i + 1]; cz += p[i + 2]; }
    cx /= count; cy /= count; cz /= count;
    let score = 0;
    for (let t = 0; t < idx.length; t += 3) {
      const a = idx[t] * 3, b = idx[t + 1] * 3, c = idx[t + 2] * 3;
      const e1x = p[b] - p[a], e1y = p[b + 1] - p[a + 1], e1z = p[b + 2] - p[a + 2];
      const e2x = p[c] - p[a], e2y = p[c + 1] - p[a + 1], e2z = p[c + 2] - p[a + 2];
      const nx = e1y * e2z - e1z * e2y, ny = e1z * e2x - e1x * e2z, nz = e1x * e2y - e1y * e2x;
      const mx = (p[a] + p[b] + p[c]) / 3 - cx, my = (p[a + 1] + p[b + 1] + p[c + 1]) / 3 - cy, mz = (p[a + 2] + p[b + 2] + p[c + 2]) / 3 - cz;
      score += (nx * mx + ny * my + nz * mz) > 0 ? 1 : -1;
    }
    if (score < 0) {
      for (let t = 0; t < idx.length; t += 3) { const tmp = idx[t + 1]; idx[t + 1] = idx[t + 2]; idx[t + 2] = tmp; }
    }
  }

  function buildUvSphere(segments, rings, displaceFn) {
    const pos = [], nor = [], surf = [], idx = [];
    for (let y = 0; y <= rings; y += 1) {
      const phi = (y / rings) * PI, sp = Math.sin(phi), cp = Math.cos(phi);
      for (let x = 0; x <= segments; x += 1) {
        const th = (x / segments) * 2 * PI;
        let px = Math.cos(th) * sp, py = cp, pz = Math.sin(th) * sp;
        let d = 1;
        if (displaceFn) {
          d = displaceFn(px, py, pz);
          px *= d; py *= d; pz *= d;
        }
        pos.push(px, py, pz);
        nor.push(px, py, pz);
        surf.push(0.45, clamp(0.84 + (d - 1) * 2.2, 0.45, 1.0));
      }
    }
    for (let y = 0; y < rings; y += 1) {
      for (let x = 0; x < segments; x += 1) {
        const a = y * (segments + 1) + x, b = a + segments + 1;
        idx.push(a, b, a + 1, b, b + 1, a + 1);
      }
    }
    const mesh = createMesh(new Float32Array(pos), new Float32Array(nor), new Uint32Array(idx), new Float32Array(surf));
    ensureOutwardWinding(mesh);
    if (displaceFn) recomputeNormals(mesh);
    return mesh;
  }

  function catmullRom(points, segs) {
    const out = [];
    const n = points.length;
    for (let i = 0; i < n - 1; i += 1) {
      const p0 = points[Math.max(i - 1, 0)], p1 = points[i], p2 = points[i + 1], p3 = points[Math.min(i + 2, n - 1)];
      for (let s = 0; s < segs; s += 1) {
        const t = s / segs, t2 = t * t, t3 = t2 * t;
        const pt = [0, 0, 0];
        for (let k = 0; k < 3; k += 1) {
          pt[k] = 0.5 * ((2 * p1[k]) + (-p0[k] + p2[k]) * t + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t2 + (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * t3);
        }
        out.push(pt);
      }
    }
    out.push(points[n - 1].slice());
    return out;
  }

  function buildTube(path, radiusAt, radial, helicalVessels) {
    const n = path.length;
    const pos = [], nor = [], surf = [], idx = [];
    let prevN = null;
    for (let i = 0; i < n; i += 1) {
      const u = i / (n - 1);
      const t = vNorm(vSub(path[Math.min(i + 1, n - 1)], path[Math.max(i - 1, 0)]));
      let N;
      if (!prevN) {
        const helper = Math.abs(t[0]) < 0.9 ? [1, 0, 0] : [0, 1, 0];
        N = vNorm(vCross(t, helper));
      } else {
        N = vNorm(vSub(prevN, vScale(t, vDot(prevN, t))));
      }
      prevN = N;
      const B = vNorm(vCross(t, N));
      const baseR = radiusAt(u);
      for (let j = 0; j <= radial; j += 1) {
        const a = (j / radial) * 2 * PI;
        let r = baseR;
        let ao = 0.95;
        if (helicalVessels) {
          const twist = a * 3.0 + u * 26.0;
          const ridge = 0.5 + 0.5 * Math.cos(twist);
          r = baseR * (0.91 + 0.14 * ridge);
          ao = 0.62 + 0.38 * ridge;
        }
        const c = Math.cos(a), s = Math.sin(a);
        const nx = N[0] * c + B[0] * s, ny = N[1] * c + B[1] * s, nz = N[2] * c + B[2] * s;
        pos.push(path[i][0] + nx * r, path[i][1] + ny * r, path[i][2] + nz * r);
        nor.push(nx, ny, nz);
        surf.push(u, ao);
      }
    }
    for (let i = 0; i < n - 1; i += 1) {
      for (let j = 0; j < radial; j += 1) {
        const a = i * (radial + 1) + j, b = a + radial + 1;
        idx.push(a, a + 1, b, a + 1, b + 1, b);
      }
    }
    const mesh = createMesh(new Float32Array(pos), new Float32Array(nor), new Uint32Array(idx), new Float32Array(surf));
    if (helicalVessels) recomputeNormals(mesh);
    return mesh;
  }

  /* ======================================================================
     Hierarchical Signed-Distance Sculpting Rig
     - Supports independent anatomical sub-groups (`createSubGroup`) so
       arms/hands never web into the chest, legs/feet never web into the
       belly, and adjacent fingers/toes (`min` mode) never web together!
     ====================================================================== */
  function createRig() {
    return { prims: [], subs: [], posts: [], postSubs: [], minPrims: [], minK: 0.010, groups: [], creases: [], maxK: 0 };
  }

  function rigCrease(rig, a, b, radius, depth, aoDarken) {
    const bax = b[0] - a[0], bay = b[1] - a[1], baz = b[2] - a[2];
    rig.creases.push({
      ax: a[0], ay: a[1], az: a[2],
      bx: b[0], by: b[1], bz: b[2],
      bax: bax, bay: bay, baz: baz,
      l2: Math.max(bax * bax + bay * bay + baz * baz, 1e-9),
      r: radius,
      depth: depth || 0,
      ao: aoDarken || 0.45
    });
  }

  function createSubGroup(parentRig, kJoin, minK) {
    const g = {
      prims: [], subs: [], posts: [], postSubs: [], minPrims: [],
      minK: minK || 0.010, k: kJoin || 0.014, maxK: kJoin || 0.014,
      bb: [Infinity, Infinity, Infinity, -Infinity, -Infinity, -Infinity]
    };
    parentRig.groups.push(g);
    if (g.k > parentRig.maxK) parentRig.maxK = g.k;
    return g;
  }

  function expandBb(targetBb, bb, pad) {
    const p = pad || 0;
    if (bb[0] - p < targetBb[0]) targetBb[0] = bb[0] - p;
    if (bb[1] - p < targetBb[1]) targetBb[1] = bb[1] - p;
    if (bb[2] - p < targetBb[2]) targetBb[2] = bb[2] - p;
    if (bb[3] + p > targetBb[3]) targetBb[3] = bb[3] + p;
    if (bb[4] + p > targetBb[4]) targetBb[4] = bb[4] + p;
    if (bb[5] + p > targetBb[5]) targetBb[5] = bb[5] + p;
  }

  function addPrim(target, prim, mode) {
    let list = target.prims;
    if (mode === true || mode === 'sub') list = target.subs;
    else if (mode === 'post') list = target.posts;
    else if (mode === 'postsub') list = target.postSubs;
    else if (mode === 'min') list = target.minPrims;
    list.push(prim);
    if (prim.k > target.maxK) target.maxK = prim.k;
    if (target.bb && mode !== true && mode !== 'sub' && mode !== 'postsub') {
      expandBb(target.bb, prim.bb, prim.k);
    }
  }

  function rigSphere(target, c, r, k, mode) {
    addPrim(target, {
      t: 1, x: c[0], y: c[1], z: c[2], r: r, k: k || 0.01,
      bb: [c[0] - r, c[1] - r, c[2] - r, c[0] + r, c[1] + r, c[2] + r]
    }, mode);
  }

  function rigCone(target, a, b, ra, rb, k, mode) {
    const bax = b[0] - a[0], bay = b[1] - a[1], baz = b[2] - a[2];
    addPrim(target, {
      t: 2, x: a[0], y: a[1], z: a[2], x2: b[0], y2: b[1], z2: b[2], r: ra, r2: rb, k: k || 0.01,
      l2: Math.max(bax * bax + bay * bay + baz * baz, 1e-9),
      bb: [
        Math.min(a[0] - ra, b[0] - rb), Math.min(a[1] - ra, b[1] - rb), Math.min(a[2] - ra, b[2] - rb),
        Math.max(a[0] + ra, b[0] + rb), Math.max(a[1] + ra, b[1] + rb), Math.max(a[2] + ra, b[2] + rb)
      ]
    }, mode);
  }

  function rigEllipsoid(target, c, radii, basis, k, mode) {
    const u = basis ? basis.u : [1, 0, 0];
    const v = basis ? basis.v : [0, 1, 0];
    const w = basis ? basis.w : [0, 0, 1];
    const ex = Math.abs(u[0]) * radii[0] + Math.abs(v[0]) * radii[1] + Math.abs(w[0]) * radii[2];
    const ey = Math.abs(u[1]) * radii[0] + Math.abs(v[1]) * radii[1] + Math.abs(w[1]) * radii[2];
    const ez = Math.abs(u[2]) * radii[0] + Math.abs(v[2]) * radii[1] + Math.abs(w[2]) * radii[2];
    addPrim(target, {
      t: 3, x: c[0], y: c[1], z: c[2], rx: radii[0], ry: radii[1], rz: radii[2],
      ux: u[0], uy: u[1], uz: u[2], vx: v[0], vy: v[1], vz: v[2], wx: w[0], wy: w[1], wz: w[2], k: k || 0.01,
      bb: [c[0] - ex, c[1] - ey, c[2] - ez, c[0] + ex, c[1] + ey, c[2] + ez]
    }, mode);
  }

  function primDist(p, x, y, z) {
    if (p.t === 1) {
      const dx = x - p.x, dy = y - p.y, dz = z - p.z;
      return Math.sqrt(dx * dx + dy * dy + dz * dz) - p.r;
    }
    if (p.t === 2) {
      const bax = p.x2 - p.x, bay = p.y2 - p.y, baz = p.z2 - p.z;
      const pax = x - p.x, pay = y - p.y, paz = z - p.z;
      let t = (pax * bax + pay * bay + paz * baz) / p.l2;
      t = t < 0 ? 0 : (t > 1 ? 1 : t);
      const dx = pax - bax * t, dy = pay - bay * t, dz = paz - baz * t;
      return Math.sqrt(dx * dx + dy * dy + dz * dz) - (p.r + (p.r2 - p.r) * t);
    }
    const dx = x - p.x, dy = y - p.y, dz = z - p.z;
    const lx = dx * p.ux + dy * p.uy + dz * p.uz;
    const ly = dx * p.vx + dy * p.vy + dz * p.vz;
    const lz = dx * p.wx + dy * p.wy + dz * p.wz;
    const ax = lx / p.rx, ay = ly / p.ry, az = lz / p.rz;
    const k0 = Math.sqrt(ax * ax + ay * ay + az * az);
    const bx = ax / p.rx, by = ay / p.ry, bz = az / p.rz;
    const k1 = Math.sqrt(bx * bx + by * by + bz * bz);
    return k1 > 1e-9 ? k0 * (k0 - 1) / k1 : -Math.min(p.rx, p.ry, p.rz);
  }

  function boxDist(bb, x, y, z) {
    const dx = Math.max(bb[0] - x, 0, x - bb[3]);
    const dy = Math.max(bb[1] - y, 0, y - bb[4]);
    const dz = Math.max(bb[2] - z, 0, z - bb[5]);
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  function smin(a, b, k) {
    if (k <= 1e-5) return Math.min(a, b);
    const h = Math.max(k - Math.abs(a - b), 0) / k;
    return Math.min(a, b) - h * h * k * 0.25;
  }

  function evalGroupNode(node, x, y, z) {
    let d = 1e9;
    const prims = node.prims;
    for (let i = 0; i < prims.length; i += 1) {
      const p = prims[i];
      if (boxDist(p.bb, x, y, z) - p.k >= d) continue;
      d = smin(d, primDist(p, x, y, z), p.k);
    }
    const subs = node.subs;
    for (let i = 0; i < subs.length; i += 1) {
      const p = subs[i];
      if (boxDist(p.bb, x, y, z) - p.k > -d) continue;
      d = -smin(-d, primDist(p, x, y, z), p.k);
    }
    const posts = node.posts;
    for (let i = 0; i < posts.length; i += 1) {
      const p = posts[i];
      if (boxDist(p.bb, x, y, z) - p.k >= d) continue;
      d = smin(d, primDist(p, x, y, z), p.k);
    }
    const postSubs = node.postSubs;
    if (postSubs) {
      for (let i = 0; i < postSubs.length; i += 1) {
        const p = postSubs[i];
        if (boxDist(p.bb, x, y, z) - p.k > -d) continue;
        d = -smin(-d, primDist(p, x, y, z), p.k);
      }
    }
    const minPrims = node.minPrims;
    if (minPrims && minPrims.length > 0) {
      let dMin = 1e9;
      for (let i = 0; i < minPrims.length; i += 1) {
        const p = minPrims[i];
        if (boxDist(p.bb, x, y, z) >= dMin) continue;
        const pd = primDist(p, x, y, z);
        if (pd < dMin) dMin = pd;
      }
      d = smin(d, dMin, node.minK);
    }
    return d;
  }

  function evalRig(rig, x, y, z) {
    let d = evalGroupNode(rig, x, y, z);
    const groups = rig.groups;
    for (let g = 0; g < groups.length; g += 1) {
      const grp = groups[g];
      if (boxDist(grp.bb, x, y, z) - grp.k >= d) continue;
      const dg = evalGroupNode(grp, x, y, z);
      d = smin(d, dg, grp.k);
    }
    return d;
  }

  function rigBounds(rig) {
    const bb = [Infinity, Infinity, Infinity, -Infinity, -Infinity, -Infinity];
    const lists = [rig.prims, rig.posts, rig.minPrims];
    for (let l = 0; l < lists.length; l += 1) {
      if (!lists[l]) continue;
      for (let i = 0; i < lists[l].length; i += 1) {
        expandBb(bb, lists[l][i].bb, 0);
      }
    }
    for (let g = 0; g < rig.groups.length; g += 1) {
      expandBb(bb, rig.groups[g].bb, 0);
    }
    return bb;
  }

  /* ---------- Naive Surface Nets ---------- */
  const CORNER_OFF = [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [0, 0, 1], [1, 0, 1], [0, 1, 1], [1, 1, 1]];
  const CELL_EDGES = [[0, 1], [2, 3], [4, 5], [6, 7], [0, 2], [1, 3], [4, 6], [5, 7], [0, 4], [1, 5], [2, 6], [3, 7]];

  function surfaceNets(field, sx, sy, sz, ox, oy, oz, h) {
    const nx = sx - 1, ny = sy - 1, nz = sz - 1;
    const cellIdx = new Int32Array(nx * ny * nz).fill(-1);
    const positions = [];
    const vals = new Float32Array(8);
    let vcount = 0;

    for (let k = 0; k < nz; k += 1) {
      for (let j = 0; j < ny; j += 1) {
        for (let i = 0; i < nx; i += 1) {
          let mask = 0;
          for (let c = 0; c < 8; c += 1) {
            const v = field[(i + CORNER_OFF[c][0]) + sx * ((j + CORNER_OFF[c][1]) + sy * (k + CORNER_OFF[c][2]))];
            vals[c] = v;
            if (v < 0) mask |= (1 << c);
          }
          if (mask === 0 || mask === 255) continue;
          let ax = 0, ay = 0, az = 0, cnt = 0;
          for (let e = 0; e < 12; e += 1) {
            const c0 = CELL_EDGES[e][0], c1 = CELL_EDGES[e][1];
            const v0 = vals[c0], v1 = vals[c1];
            if ((v0 < 0) === (v1 < 0)) continue;
            const t = v0 / (v0 - v1);
            ax += CORNER_OFF[c0][0] + (CORNER_OFF[c1][0] - CORNER_OFF[c0][0]) * t;
            ay += CORNER_OFF[c0][1] + (CORNER_OFF[c1][1] - CORNER_OFF[c0][1]) * t;
            az += CORNER_OFF[c0][2] + (CORNER_OFF[c1][2] - CORNER_OFF[c0][2]) * t;
            cnt += 1;
          }
          positions.push(ox + (i + ax / cnt) * h, oy + (j + ay / cnt) * h, oz + (k + az / cnt) * h);
          cellIdx[i + nx * (j + ny * k)] = vcount;
          vcount += 1;
        }
      }
    }

    const indices = [];
    function cell(i, j, k) { return cellIdx[i + nx * (j + ny * k)]; }
    function quad(a, b, c, d, flip) {
      if (a < 0 || b < 0 || c < 0 || d < 0) return;
      if (flip) indices.push(a, c, b, a, d, c); else indices.push(a, b, c, a, c, d);
    }
    for (let k = 1; k < nz; k += 1) {
      for (let j = 1; j < ny; j += 1) {
        for (let i = 0; i < nx; i += 1) {
          const a = field[i + sx * (j + sy * k)] < 0, b = field[(i + 1) + sx * (j + sy * k)] < 0;
          if (a !== b) quad(cell(i, j - 1, k - 1), cell(i, j, k - 1), cell(i, j, k), cell(i, j - 1, k), a);
        }
      }
    }
    for (let k = 1; k < nz; k += 1) {
      for (let j = 0; j < ny; j += 1) {
        for (let i = 1; i < nx; i += 1) {
          const a = field[i + sx * (j + sy * k)] < 0, b = field[i + sx * ((j + 1) + sy * k)] < 0;
          if (a !== b) quad(cell(i - 1, j, k - 1), cell(i, j, k - 1), cell(i, j, k), cell(i - 1, j, k), !a);
        }
      }
    }
    for (let k = 0; k < nz; k += 1) {
      for (let j = 1; j < ny; j += 1) {
        for (let i = 1; i < nx; i += 1) {
          const a = field[i + sx * (j + sy * k)] < 0, b = field[i + sx * (j + sy * (k + 1))] < 0;
          if (a !== b) quad(cell(i - 1, j - 1, k), cell(i, j - 1, k), cell(i, j, k), cell(i - 1, j, k), a);
        }
      }
    }
    return { positions: new Float32Array(positions), indices: new Uint32Array(indices) };
  }

  function makeFieldSampler(field, sx, sy, sz, ox, oy, oz, h) {
    return function sample(x, y, z) {
      const fx = (x - ox) / h, fy = (y - oy) / h, fz = (z - oz) / h;
      const i = clamp(Math.floor(fx), 0, sx - 2), j = clamp(Math.floor(fy), 0, sy - 2), k = clamp(Math.floor(fz), 0, sz - 2);
      const tx = clamp(fx - i, 0, 1), ty = clamp(fy - j, 0, 1), tz = clamp(fz - k, 0, 1);
      const idx = i + sx * (j + sy * k);
      const c000 = field[idx], c100 = field[idx + 1], c010 = field[idx + sx], c110 = field[idx + sx + 1];
      const c001 = field[idx + sx * sy], c101 = field[idx + sx * sy + 1], c011 = field[idx + sx * sy + sx], c111 = field[idx + sx * sy + sx + 1];
      const x00 = lerp(c000, c100, tx), x10 = lerp(c010, c110, tx), x01 = lerp(c001, c101, tx), x11 = lerp(c011, c111, tx);
      return lerp(lerp(x00, x10, ty), lerp(x01, x11, ty), tz);
    };
  }

  function rigToMesh(rig, resolution) {
    const bb = rigBounds(rig);
    const ext0 = [bb[3] - bb[0], bb[4] - bb[1], bb[5] - bb[2]];
    const pad = rig.maxK + Math.max(ext0[0], ext0[1], ext0[2]) * 0.035;
    const ox = bb[0] - pad, oy = bb[1] - pad, oz = bb[2] - pad;
    const ext = [ext0[0] + 2 * pad, ext0[1] + 2 * pad, ext0[2] + 2 * pad];
    const h = Math.max(ext[0], ext[1], ext[2]) / resolution;
    const nx = Math.max(2, Math.ceil(ext[0] / h)), ny = Math.max(2, Math.ceil(ext[1] / h)), nz = Math.max(2, Math.ceil(ext[2] / h));
    const sx = nx + 1, sy = ny + 1, sz = nz + 1;
    const field = new Float32Array(sx * sy * sz);

    const B = 4;
    const bxn = Math.ceil(sx / B), byn = Math.ceil(sy / B), bzn = Math.ceil(sz / B);
    const coarse = new Float32Array(bxn * byn * bzn);
    const halfDiag = B * h * Math.sqrt(3) * 0.5;
    const margin = 5.0 * h + rig.maxK * 0.35;
    for (let bk = 0; bk < bzn; bk += 1) {
      for (let bj = 0; bj < byn; bj += 1) {
        for (let bi = 0; bi < bxn; bi += 1) {
          coarse[bi + bxn * (bj + byn * bk)] = evalRig(rig, ox + (bi * B + B * 0.5) * h, oy + (bj * B + B * 0.5) * h, oz + (bk * B + B * 0.5) * h);
        }
      }
    }
    for (let k = 0; k < sz; k += 1) {
      const bk = Math.min(bzn - 1, (k / B) | 0);
      for (let j = 0; j < sy; j += 1) {
        const bj = Math.min(byn - 1, (j / B) | 0);
        for (let i = 0; i < sx; i += 1) {
          const bi = Math.min(bxn - 1, (i / B) | 0);
          const cv = coarse[bi + bxn * (bj + byn * bk)];
          const idx = i + sx * (j + sy * k);
          if (Math.abs(cv) > halfDiag + margin) {
            field[idx] = cv;
          } else {
            field[idx] = evalRig(rig, ox + i * h, oy + j * h, oz + k * h);
          }
        }
      }
    }

    const net = surfaceNets(field, sx, sy, sz, ox, oy, oz, h);
    const sample = makeFieldSampler(field, sx, sy, sz, ox, oy, oz, h);
    const pos = net.positions;
    const idx = net.indices;
    const vCount = pos.length / 3;
    const eps = h * 0.14;

    // 2 passes of Tangential Laplacian Relaxation + Exact Analytical SDF (evalRig = 0) Newton Projection
    // (Slides vertices only in the tangent plane so fingers/toes/lips/nose never shrink, and snaps to exact mathematical surface!)
    const sumPos = new Float32Array(pos.length);
    const deg = new Uint16Array(vCount);
    for (let pass = 0; pass < 2; pass += 1) {
      sumPos.fill(0);
      deg.fill(0);
      for (let t = 0; t < idx.length; t += 3) {
        const va = idx[t], vb = idx[t + 1], vc = idx[t + 2];
        const a = va * 3, b = vb * 3, c = vc * 3;
        sumPos[a] += pos[b] + pos[c]; sumPos[a + 1] += pos[b + 1] + pos[c + 1]; sumPos[a + 2] += pos[b + 2] + pos[c + 2];
        sumPos[b] += pos[a] + pos[c]; sumPos[b + 1] += pos[a + 1] + pos[c + 1]; sumPos[b + 2] += pos[a + 2] + pos[c + 2];
        sumPos[c] += pos[a] + pos[b]; sumPos[c + 1] += pos[a + 1] + pos[b + 1]; sumPos[c + 2] += pos[a + 2] + pos[b + 2];
        deg[va] += 2; deg[vb] += 2; deg[vc] += 2;
      }
      for (let v = 0; v < vCount; v += 1) {
        const cnt = deg[v];
        if (!cnt) continue;
        const i = v * 3;
        let x = pos[i], y = pos[i + 1], z = pos[i + 2];
        const d0 = evalRig(rig, x, y, z);
        let gx = (evalRig(rig, x + eps, y, z) - d0) / eps;
        let gy = (evalRig(rig, x, y + eps, z) - d0) / eps;
        let gz = (evalRig(rig, x, y, z + eps) - d0) / eps;
        const gl = Math.sqrt(gx * gx + gy * gy + gz * gz);
        if (gl > 1e-9) {
          gx /= gl; gy /= gl; gz /= gl;
          // Tangential relaxation: move toward neighbor centroid ONLY perpendicular to the surface normal (zero cylinder shrinkage!)
          const lx = (sumPos[i] / cnt) - x;
          const ly = (sumPos[i + 1] / cnt) - y;
          const lz = (sumPos[i + 2] / cnt) - z;
          const vn = lx * gx + ly * gy + lz * gz;
          x += (lx - vn * gx) * 0.45;
          y += (ly - vn * gy) * 0.45;
          z += (lz - vn * gz) * 0.45;
          // Exact Newton projection onto evalRig(rig, x, y, z) = 0
          const dNew = clamp(evalRig(rig, x, y, z), -h * 0.48, h * 0.48);
          x -= gx * dNew * 0.88;
          y -= gy * dNew * 0.88;
          z -= gz * dNew * 0.88;
        }
        pos[i] = x; pos[i + 1] = y; pos[i + 2] = z;
      }
    }

    const normals = new Float32Array(pos.length);
    const surface = new Float32Array(vCount * 2);
    const probeIn1 = h * 1.9;
    const probeIn2 = h * 3.9;
    const probeOut1 = h * 1.6;
    const probeOut2 = h * 3.2;
    const creases = rig.creases;

    for (let v = 0; v < vCount; v += 1) {
      const i = v * 3;
      let x = pos[i], y = pos[i + 1], z = pos[i + 2];
      let nx0 = evalRig(rig, x + eps, y, z) - evalRig(rig, x - eps, y, z);
      let ny0 = evalRig(rig, x, y + eps, z) - evalRig(rig, x, y - eps, z);
      let nz0 = evalRig(rig, x, y, z + eps) - evalRig(rig, x, y, z - eps);
      const l = Math.sqrt(nx0 * nx0 + ny0 * ny0 + nz0 * nz0);
      if (l > 1e-12) { nx0 /= l; ny0 /= l; nz0 /= l; } else { nx0 = 0; ny0 = 1; nz0 = 0; }

      const dIn1 = -sample(x - nx0 * probeIn1, y - ny0 * probeIn1, z - nz0 * probeIn1) / probeIn1;
      const dIn2 = -sample(x - nx0 * probeIn2, y - ny0 * probeIn2, z - nz0 * probeIn2) / probeIn2;
      const thickness = clamp((clamp(dIn1, 0.08, 1.0) * 0.45 + clamp(dIn2, 0.08, 1.0) * 0.55), 0.08, 1.0);

      const dOut1 = sample(x + nx0 * probeOut1, y + ny0 * probeOut1, z + nz0 * probeOut1) / probeOut1;
      const dOut2 = sample(x + nx0 * probeOut2, y + ny0 * probeOut2, z + nz0 * probeOut2) / probeOut2;
      let ao = clamp(0.48 * clamp(dOut1, 0.28, 1.0) + 0.52 * clamp(dOut2, 0.28, 1.0), 0.35, 1.0);

      if (creases && creases.length) {
        for (let c = 0; c < creases.length; c += 1) {
          const cr = creases[c];
          const pax = x - cr.ax, pay = y - cr.ay, paz = z - cr.az;
          const t = clamp((pax * cr.bax + pay * cr.bay + paz * cr.baz) / cr.l2, 0, 1);
          const dx = pax - cr.bax * t, dy = pay - cr.bay * t, dz = paz - cr.baz * t;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < cr.r) {
            const u = 1.0 - dist / cr.r;
            const s = u * u * (3.0 - 2.0 * u);
            x -= nx0 * cr.depth * s;
            y -= ny0 * cr.depth * s;
            z -= nz0 * cr.depth * s;
            ao = Math.min(ao, clamp(1.0 - cr.ao * s, 0.35, 1.0));
            if (dist > 1e-6) {
              const tilt = (4.0 * u * (1.0 - u)) * 0.36;
              nx0 -= (dx / dist) * tilt;
              ny0 -= (dy / dist) * tilt;
              nz0 -= (dz / dist) * tilt;
              const nl = Math.sqrt(nx0 * nx0 + ny0 * ny0 + nz0 * nz0) || 1;
              nx0 /= nl; ny0 /= nl; nz0 /= nl;
            }
          }
        }
        pos[i] = x; pos[i + 1] = y; pos[i + 2] = z;
      }

      normals[i] = nx0; normals[i + 1] = ny0; normals[i + 2] = nz0;
      surface[v * 2] = thickness;
      surface[v * 2 + 1] = ao;
    }

    for (let t = 0; t < idx.length; t += 3) {
      const a = idx[t] * 3, b = idx[t + 1] * 3, c = idx[t + 2] * 3;
      const e1x = pos[b] - pos[a], e1y = pos[b + 1] - pos[a + 1], e1z = pos[b + 2] - pos[a + 2];
      const e2x = pos[c] - pos[a], e2y = pos[c + 1] - pos[a + 1], e2z = pos[c + 2] - pos[a + 2];
      const gx = e1y * e2z - e1z * e2y, gy = e1z * e2x - e1x * e2z, gz = e1x * e2y - e1y * e2x;
      const nxs = normals[a] + normals[b] + normals[c], nys = normals[a + 1] + normals[b + 1] + normals[c + 1], nzs = normals[a + 2] + normals[b + 2] + normals[c + 2];
      if (gx * nxs + gy * nys + gz * nzs < 0) { const tmp = idx[t + 1]; idx[t + 1] = idx[t + 2]; idx[t + 2] = tmp; }
    }

    const mesh = createMesh(pos, normals, idx, surface);
    const sdfNormals = normals.slice();
    recomputeNormals(mesh);
    const geoNormals = mesh.normals;
    for (let i = 0; i < sdfNormals.length; i += 3) {
      let nx1 = lerp(sdfNormals[i], geoNormals[i], 0.18);
      let ny1 = lerp(sdfNormals[i + 1], geoNormals[i + 1], 0.18);
      let nz1 = lerp(sdfNormals[i + 2], geoNormals[i + 2], 0.18);
      const l = Math.sqrt(nx1 * nx1 + ny1 * ny1 + nz1 * nz1) || 1;
      geoNormals[i] = nx1 / l; geoNormals[i + 1] = ny1 / l; geoNormals[i + 2] = nz1 / l;
    }
    return mesh;
  }

  /* ======================================================================
     Materials & scene parts
     ====================================================================== */
  function mat(overrides) {
    return Object.assign({
      base: [0.9, 0.7, 0.65], sss: [0.98, 0.36, 0.24], sssAmt: 0.5, alpha: 1, rough: 0.42, spec: 0.45,
      vein: 0, cell: 0, fresnel: 0.35, rim: [1, 0.85, 0.78], emissive: [0, 0, 0], noiseScale: 1,
      matType: 0 // 0=generic/organ, 1=skin, 2=sac/membrane, 3=cord, 4=placenta/endometrium, 5=eye
    }, overrides);
  }

  const MAT = {
    zona: mat({ base: [0.88, 0.94, 1.0], alpha: 0.0, rough: 0.05, spec: 1.25, fresnel: 0.92, rim: [0.85, 0.96, 1.0], sssAmt: 0.1, matType: 2 }),
    ooplasm: mat({ base: [0.96, 0.88, 0.79], alpha: 0.95, rough: 0.42, spec: 0.45, cell: 0.58, noiseScale: 2.6, sss: [1, 0.75, 0.52], sssAmt: 0.68, fresnel: 0.42 }),
    nucleus: mat({ base: [0.84, 0.58, 0.52], alpha: 0.82, rough: 0.5, spec: 0.3, sss: [0.98, 0.42, 0.32], sssAmt: 0.55, fresnel: 0.25 }),
    cumulus: mat({ base: [0.93, 0.82, 0.72], alpha: 0.92, rough: 0.48, spec: 0.38, sss: [1, 0.72, 0.55], sssAmt: 0.62, fresnel: 0.48, cell: 0.32, noiseScale: 3 }),
    blastomere: mat({ base: [0.96, 0.89, 0.82], alpha: 0.93, rough: 0.28, spec: 0.68, cell: 0.4, noiseScale: 2.2, sss: [1, 0.78, 0.6], sssAmt: 0.72, fresnel: 0.58, rim: [0.95, 0.92, 1] }),
    trophoblast: mat({ base: [0.96, 0.82, 0.74], alpha: 0.38, rough: 0.26, spec: 0.72, cell: 0.95, noiseScale: 1.3, fresnel: 0.65, sssAmt: 0.45 }),
    icm: mat({ base: [0.95, 0.78, 0.7], alpha: 1, rough: 0.38, spec: 0.45, cell: 0.45, noiseScale: 3, sss: [1, 0.55, 0.42], sssAmt: 0.65, fresnel: 0.42 }),
    endometrium: mat({ base: [0.78, 0.28, 0.3], alpha: 1, rough: 0.52, spec: 0.42, vein: 0.85, cell: 0.35, noiseScale: 4.5, sss: [0.98, 0.28, 0.22], sssAmt: 0.62, fresnel: 0.3, matType: 4 }),
    heart: mat({ base: [0.82, 0.14, 0.16], alpha: 1, rough: 0.28, spec: 0.65, sss: [1, 0.22, 0.16], sssAmt: 0.75, fresnel: 0.35, rim: [1, 0.46, 0.38] }),
    liver: mat({ base: [0.56, 0.16, 0.18], alpha: 1, rough: 0.42, spec: 0.38, sss: [0.88, 0.22, 0.18], sssAmt: 0.42, fresnel: 0.22 }),
    brain: mat({ base: [0.94, 0.76, 0.78], alpha: 0.94, rough: 0.42, spec: 0.42, sss: [1, 0.52, 0.46], sssAmt: 0.58, fresnel: 0.32, cell: 0.22, noiseScale: 2.4 }),
    spine: mat({ base: [0.95, 0.9, 0.88], alpha: 1, rough: 0.45, spec: 0.35, sssAmt: 0.35, fresnel: 0.22 }),
    eyeDark: mat({ base: [0.10, 0.06, 0.08], alpha: 0.96, rough: 0.08, spec: 1.15, sssAmt: 0.08, fresnel: 0.42, rim: [0.65, 0.72, 0.85], matType: 5 }),
    eyeLens: mat({ base: [0.82, 0.88, 0.95], alpha: 0.35, rough: 0.04, spec: 1.4, sssAmt: 0.1, fresnel: 0.75, rim: [0.9, 0.96, 1.0], matType: 2 }),
    sclera: mat({ base: [0.93, 0.84, 0.82], alpha: 1, rough: 0.14, spec: 0.90, sss: [0.98, 0.45, 0.38], sssAmt: 0.38, fresnel: 0.25, matType: 5 }),
    iris: mat({ base: [0.18, 0.15, 0.22], alpha: 1, rough: 0.08, spec: 1.20, sssAmt: 0.10, fresnel: 0.28, rim: [0.55, 0.62, 0.78], matType: 5 }),
    pupil: mat({ base: [0.03, 0.03, 0.04], alpha: 1, rough: 0.04, spec: 1.40, sssAmt: 0, fresnel: 0.15, matType: 5 }),
    cord: mat({ base: [0.88, 0.80, 0.84], alpha: 0.97, rough: 0.22, spec: 0.78, vein: 0.85, noiseScale: 1.6, sss: [0.98, 0.34, 0.36], sssAmt: 0.68, fresnel: 0.48, rim: [0.95, 0.88, 0.96], matType: 3 }),
    yolk: mat({ base: [0.98, 0.68, 0.22], alpha: 0.88, rough: 0.24, spec: 0.75, vein: 0.72, noiseScale: 2.4, sss: [1, 0.58, 0.12], sssAmt: 0.92, fresnel: 0.55, rim: [1, 0.86, 0.45], matType: 1 }),
    amnion: mat({ base: [0.84, 0.93, 0.99], alpha: 0.0, rough: 0.05, spec: 1.25, fresnel: 0.88, rim: [0.82, 0.94, 1.0], sssAmt: 0.08, matType: 2 }),
    chorion: mat({ base: [0.78, 0.38, 0.32], alpha: 0.0, rough: 0.35, spec: 0.55, cell: 0.65, noiseScale: 1.2, fresnel: 0.58, rim: [0.96, 0.62, 0.52], sssAmt: 0.15, matType: 2 }),
    uterus: mat({ base: [0.82, 0.36, 0.34], alpha: 0.0, rough: 0.38, spec: 0.5, vein: 0.45, noiseScale: 0.9, fresnel: 0.52, rim: [0.98, 0.64, 0.54], sssAmt: 0.15, matType: 2 }),
    placenta: mat({ base: [0.54, 0.12, 0.14], alpha: 1, rough: 0.46, spec: 0.48, vein: 0.78, cell: 0.62, noiseScale: 2.6, sss: [0.95, 0.22, 0.18], sssAmt: 0.48, fresnel: 0.32, matType: 4 })
  };

  function part(mesh, material, opts) {
    const m = material;
    return Object.assign({
      mesh: mesh, material: m, model: m4Identity(),
      transparent: (m.alpha < 0.999) || (m.matType === 2),
      cull: 'back', order: 0, pulse: false, group: 'body',
      noiseOffset: [0, 0, 0], center: [0, 0, 0], animateSkin: false, xrayOnly: false
    }, opts || {});
  }

  let unitSphereHi = null, unitSphereLo = null;
  function sphereHi() { if (!unitSphereHi) { unitSphereHi = buildUvSphere(56, 36); unitSphereHi.shared = true; } return unitSphereHi; }
  function sphereLo() { if (!unitSphereLo) { unitSphereLo = buildUvSphere(26, 18); unitSphereLo.shared = true; } return unitSphereLo; }

  function spherePart(center, radius, material, opts, hiRes) {
    const p = part(hiRes ? sphereHi() : sphereLo(), material, opts);
    p.model = m4Mul(m4Translate(center), m4Scale([radius, radius, radius]));
    p.center = center.slice();
    p.noiseOffset = [center[0] * 3.1, center[1] * 2.7, center[2] * 1.9];
    return p;
  }

  function ellipsoidPart(center, radii, basis, material, opts, hiRes) {
    const p = part(hiRes ? sphereHi() : sphereLo(), material, opts);
    const u = basis ? basis.u : [1, 0, 0], v = basis ? basis.v : [0, 1, 0], w = basis ? basis.w : [0, 0, 1];
    p.model = m4Mul(m4FromBasis(u, v, w, center), m4Scale(radii));
    p.center = center.slice();
    p.noiseOffset = [center[0] * 3.1, center[1] * 2.7, center[2] * 1.9];
    return p;
  }

  /* ======================================================================
     Keyframe interpolation by gestational week
     ====================================================================== */
  function K(week, table) {
    const keys = Object.keys(table).map(Number).sort(function (a, b) { return a - b; });
    if (week <= keys[0]) return table[keys[0]];
    if (week >= keys[keys.length - 1]) return table[keys[keys.length - 1]];
    for (let i = 0; i < keys.length - 1; i += 1) {
      if (week >= keys[i] && week <= keys[i + 1]) {
        const t = (week - keys[i]) / (keys[i + 1] - keys[i]);
        const a = table[keys[i]], b = table[keys[i + 1]];
        if (Array.isArray(a)) return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
        return lerp(a, b, t);
      }
    }
    return table[keys[0]];
  }

  function fetalHeartRate(week) {
    return K(week, { 5: 95, 6: 115, 7: 140, 8: 160, 9: 172, 10: 165, 12: 158, 16: 150, 20: 145, 28: 140, 40: 135 });
  }

  /* ======================================================================
     Stage scenes
     ====================================================================== */
  function buildOocyteScene(week) {
    const parts = [];
    const rng = mulberry32(week === 1 ? 11 : 23);
    parts.push(spherePart([0, 0, 0], 0.84, MAT.ooplasm, { order: 1, group: 'cell' }, true));
    parts.push(spherePart([0.2, 0.12, 0.3], 0.27, MAT.nucleus, { order: 2, group: 'cell', transparent: true }));
    if (week >= 2) {
      parts.push(spherePart([0.58, 0.6, 0.28], 0.12, MAT.cumulus, { order: 1, group: 'cell' }));
    }
    const count = 72;
    for (let i = 0; i < count; i += 1) {
      const t = (i + 0.5) / count;
      const phi = Math.acos(1 - 2 * t);
      const th = PI * (1 + Math.sqrt(5)) * i;
      const dir = [Math.cos(th) * Math.sin(phi), Math.cos(phi), Math.sin(th) * Math.sin(phi)];
      const layer = rng() < 0.62 ? 1.1 : 1.3;
      const r = 0.1 + rng() * 0.07;
      parts.push(spherePart(vScale(dir, layer + rng() * 0.08), r, MAT.cumulus, { order: 1, group: 'cell' }));
    }
    parts.push(spherePart([0, 0, 0], 1.0, MAT.zona, { order: 6, group: 'sac', cull: 'two', transparent: true }, true));
    return { parts: parts, center: [0, 0, 0], radius: 1.55, bpm: 0 };
  }

  function buildMorulaScene() {
    const parts = [];
    const rng = mulberry32(31);
    const cellR = 0.345;
    for (let i = 0; i < 12; i += 1) {
      const t = (i + 0.5) / 12, phi = Math.acos(1 - 2 * t), th = PI * (1 + Math.sqrt(5)) * i;
      const dir = [Math.cos(th) * Math.sin(phi), Math.cos(phi), Math.sin(th) * Math.sin(phi)];
      parts.push(spherePart(vScale(dir, 0.56), cellR * (0.92 + rng() * 0.16), MAT.blastomere, { order: 1, group: 'cell', transparent: true }, true));
    }
    const tetra = [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]];
    for (let i = 0; i < 4; i += 1) {
      parts.push(spherePart(vScale(vNorm(tetra[i]), 0.24), cellR * 0.95, MAT.blastomere, { order: 1, group: 'cell', transparent: true }, true));
    }
    parts.push(spherePart([0.72, 0.52, 0.3], 0.09, MAT.cumulus, { order: 1, group: 'cell' }));
    parts.push(spherePart([0.8, 0.3, 0.46], 0.07, MAT.cumulus, { order: 1, group: 'cell' }));
    parts.push(spherePart([0, 0, 0], 1.0, MAT.zona, { order: 6, group: 'sac', cull: 'two', transparent: true }, true));
    return { parts: parts, center: [0, 0, 0], radius: 1.35, bpm: 0 };
  }

  function buildBlastocystScene() {
    const parts = [];
    const rng = mulberry32(47);
    const icmCenter = [-0.52, 0.12, 0.02];
    for (let i = 0; i < 14; i += 1) {
      const off = [rng() - 0.5, rng() - 0.5, rng() - 0.5];
      parts.push(spherePart(vMadd(icmCenter, off, 0.42), 0.16 + rng() * 0.05, MAT.icm, { order: 1, group: 'cell' }));
    }
    parts.push(spherePart([0, 0, 0], 1.0, MAT.trophoblast, { order: 3, group: 'cell', cull: 'two', transparent: true }, true));
    for (let i = 0; i < 7; i += 1) {
      const a = (i / 7) * 2 * PI;
      const start = vNorm([1, Math.cos(a) * 0.32, Math.sin(a) * 0.32]);
      const path = catmullRom([vScale(start, 0.92), vScale(start, 1.12), vAdd(vScale(start, 1.3), [0.1, Math.cos(a + 1) * 0.06, Math.sin(a + 1) * 0.06])], 5);
      const tube = buildTube(path, function (t) { return 0.045 * (1 - t * 0.6); }, 8, false);
      parts.push(part(tube, MAT.icm, { order: 1, group: 'cell', cull: 'none' }));
    }
    const wall = buildUvSphere(96, 64, function (x, y, z) {
      return 1 + 0.035 * (fbm3(x * 7 + 3, y * 7, z * 7, 3) - 0.5) + 0.015 * (fbm3(x * 22, y * 22 + 5, z * 22, 2) - 0.5);
    });
    const wallPart = ellipsoidPart([1.78, -0.1, -0.62], [0.7, 2.4, 2.5], null, MAT.endometrium, { order: 0, group: 'tissue', cull: 'none' });
    wallPart.mesh = wall;
    parts.push(wallPart);
    return { parts: parts, center: [0.35, 0, 0], radius: 1.7, bpm: 0 };
  }

  function buildEmbryoScene(week, opts) {
    const headR = K(week, { 5: 0.24, 6: 0.28, 7: 0.33, 8: 0.36, 9: 0.38 });
    const trunkR = K(week, { 5: 0.15, 6: 0.18, 7: 0.2, 8: 0.22, 9: 0.23 });
    const tail = K(week, { 5: 1, 6: 1, 7: 0.8, 8: 0.45, 9: 0.12 });
    const somites = K(week, { 5: 1, 6: 0.9, 7: 0.55, 8: 0.2, 9: 0 });
    const limb = K(week, { 5: 0.15, 6: 0.5, 7: 0.85, 8: 1, 9: 1 });
    const paddle = K(week, { 5: 0, 6: 0.2, 7: 0.72, 8: 1, 9: 1 });
    const arches = K(week, { 5: 1, 6: 1, 7: 0.65, 8: 0.22, 9: 0 });
    const eyeSpot = K(week, { 5: 0.35, 6: 0.75, 7: 1, 8: 1, 9: 1 });
    const curl = K(week, { 5: 1, 6: 1, 7: 0.92, 8: 0.82, 9: 0.72 });
    const heartR = K(week, { 5: 0.11, 6: 0.145, 7: 0.155, 8: 0.155, 9: 0.155 });
    const yolkR = K(week, { 5: 0.3, 6: 0.3, 7: 0.27, 8: 0.24, 9: 0.2 });
    const skinAlpha = K(week, { 5: 0.78, 6: 0.82, 7: 0.86, 8: 0.91, 9: 0.95 });
    const vein = K(week, { 5: 0.42, 6: 0.52, 7: 0.58, 8: 0.58, 9: 0.52 });

    const rig = createRig();
    const rump = [0, -0.62, -0.02];
    const ctrl = [
      vLerp(rump, [0, -0.5, 0.34 * curl], tail),
      rump,
      [0, -0.36, -0.30 * curl],
      [0, 0.04, -0.36 * curl],
      [0, 0.36, -0.24 * curl],
      [0, 0.56, 0.02],
      [0, 0.6, 0.3],
      [0, 0.4, 0.56]
    ];
    const radii = [0.016 + 0.028 * tail, 0.092, trunkR * 0.92, trunkR, trunkR * 0.88, headR * 0.76, headR * 0.96, headR * 0.88];
    const axis = catmullRom(ctrl, 6);
    const nAxis = axis.length;
    function radAt(u) {
      const f = u * (radii.length - 1);
      const i = Math.min(Math.floor(f), radii.length - 2);
      return lerp(radii[i], radii[i + 1], f - i);
    }
    for (let i = 0; i < nAxis - 1; i += 1) {
      rigCone(rig, axis[i], axis[i + 1], radAt(i / (nAxis - 1)), radAt((i + 1) / (nAxis - 1)), 0.075);
    }
    const cCenter = [0, 0, 0.15];
    function axisFrame(u) {
      const idx = Math.round(u * (nAxis - 1));
      const p = axis[idx];
      const tangent = vNorm(vSub(axis[Math.min(idx + 1, nAxis - 1)], axis[Math.max(idx - 1, 0)]));
      let dorsal = vNorm(vCross(tangent, [1, 0, 0]));
      if (vDot(dorsal, vSub(p, cCenter)) < 0) dorsal = vScale(dorsal, -1);
      return { p: p, dorsal: dorsal, tangent: tangent, r: radAt(u) };
    }

    const heartC = [0, 0.14, 0.1 + trunkR * 0.38];
    rigSphere(rig, heartC, heartR * 1.06, 0.085);
    const liverC = [0, -0.14, 0.12 + trunkR * 0.28];
    rigSphere(rig, liverC, heartR * 1.0, 0.085);
    const navel = [0, -0.3, 0.1];
    const yolkC = [0, -0.5, 0.7];
    rigCone(rig, navel, vLerp(navel, yolkC, 0.55), 0.068, 0.054, 0.055);

    if (somites > 0.05) {
      for (let i = 0; i < 14; i += 1) {
        const fr = axisFrame(0.18 + (0.72 - 0.18) * (i / 13));
        for (let s = -1; s <= 1; s += 2) {
          rigEllipsoid(rig, vAdd(vMadd(fr.p, fr.dorsal, fr.r * 0.84), [s * 0.044, 0, 0]), [0.026 * somites + 0.008, 0.022 * somites + 0.006, 0.030 * somites + 0.008], null, 0.026);
        }
      }
    }

    if (arches > 0.05) {
      for (let i = 0; i < 3; i += 1) {
        const fr = axisFrame(0.68 + 0.044 * i);
        const c = vMadd(fr.p, fr.dorsal, -fr.r * 0.86);
        const archR = (0.03 - i * 0.004) * arches + 0.006;
        rigCone(rig, [c[0] - 0.09, c[1] + 0.01, c[2] - 0.02], [c[0], c[1] - 0.015, c[2] + 0.035], archR, archR * 0.88, 0.028);
        rigCone(rig, [c[0] + 0.09, c[1] + 0.01, c[2] - 0.02], [c[0], c[1] - 0.015, c[2] + 0.035], archR, archR * 0.88, 0.028);
      }
    }

    const foreC = ctrl[7], midC = ctrl[6], hindC = ctrl[5];
    const eyeFrames = [];
    for (let s = -1; s <= 1; s += 2) {
      const eDir = vNorm([s * 0.72, -0.18, 0.67]);
      const eRight = vNorm(vCross([0, 1, 0], eDir));
      const eUp = vCross(eDir, eRight);
      const ePos = vMadd(foreC, eDir, headR * 0.96);
      eyeFrames.push({ pos: ePos, dir: eDir, basis: { u: eRight, v: eUp, w: eDir } });
    }

    for (let s = -1; s <= 1; s += 2) {
      const sh = [s * trunkR * 0.92, 0.1, -0.02 - 0.08 * curl];
      if (limb < 0.6) {
        rigEllipsoid(rig, vAdd(sh, [s * 0.045 * limb, 0, 0.025]), [0.052 * limb + 0.015, 0.038 * limb + 0.012, 0.075 * limb + 0.015], null, 0.048);
      } else {
        const armGrp = createSubGroup(rig, 0.024, 0.012);
        const el = vAdd(sh, [s * 0.105, -0.06, 0.125]);
        const wr = vAdd(el, [-s * 0.025, 0.025, 0.14]);
        rigCone(armGrp, sh, el, 0.056, 0.046, 0.04);
        rigCone(armGrp, el, wr, 0.046, 0.036, 0.035);
        const d = vNorm(vSub(wr, el));
        const n = vNorm(vCross(d, [s, 0, 0]));
        const sd = vCross(n, d);
        const hc = vMadd(wr, d, 0.048);
        rigEllipsoid(armGrp, hc, [0.058 * paddle + 0.02, 0.024, 0.066 * paddle + 0.02], { u: sd, v: n, w: d }, 0.032);
        if (week >= 7) {
          const rayAmt = clamp((week - 6.3) / 2.2, 0.25, 1.0);
          for (let f = -2; f <= 2; f += 1) {
            const angle = f * 0.24;
            const rayDir = vNorm(vAdd(vScale(d, Math.cos(angle)), vScale(sd, Math.sin(angle))));
            const b = vMadd(hc, rayDir, 0.034);
            const len = (0.046 - Math.abs(f) * 0.004) * rayAmt;
            rigCone(armGrp, b, vMadd(b, rayDir, len), 0.016, 0.013, 0.012, 'min');
          }
        }
      }
      const hp = [s * trunkR * 0.65, -0.4, -0.05 * curl];
      if (limb < 0.6) {
        rigEllipsoid(rig, vAdd(hp, [s * 0.035 * limb, -0.02, 0.03]), [0.046 * limb + 0.015, 0.034 * limb + 0.012, 0.062 * limb + 0.015], null, 0.048);
      } else {
        const legGrp = createSubGroup(rig, 0.024, 0.012);
        const kn = vAdd(hp, [s * 0.082, 0.02, 0.13]);
        const an = vAdd(kn, [-s * 0.02, -0.1, 0.085]);
        rigCone(legGrp, hp, kn, 0.052, 0.043, 0.04);
        rigCone(legGrp, kn, an, 0.043, 0.034, 0.035);
        const d = vNorm([0, -0.38, 1]);
        const fn = vNorm(vCross(d, [1, 0, 0]));
        const fs = vCross(fn, d);
        const fc = vMadd(an, d, 0.045);
        rigEllipsoid(legGrp, fc, [0.046 * paddle + 0.02, 0.022, 0.058 * paddle + 0.02], { u: fs, v: fn, w: d }, 0.032);
        if (week >= 8) {
          for (let f = -2; f <= 2; f += 1) {
            const b = vMadd(vMadd(fc, d, 0.034), fs, f * 0.018);
            rigCone(legGrp, b, vMadd(b, d, 0.030), 0.015, 0.012, 0.012, 'min');
          }
        }
      }
    }

    const skinMesh = rigToMesh(rig, opts.resolution || 96);
    const skinMat = mat({
      base: [0.95, 0.62, 0.54], sss: [1.0, 0.34, 0.22], sssAmt: 0.92, alpha: skinAlpha, rough: 0.26, spec: 0.65,
      vein: vein, fresnel: 0.50, rim: [1, 0.80, 0.70], noiseScale: 1, matType: 1
    });
    const parts = [];
    parts.push(spherePart(foreC, headR * 0.56, MAT.brain, { order: 0, group: 'organ', transparent: true, xrayOnly: true }));
    parts.push(spherePart(midC, headR * 0.58, MAT.brain, { order: 0, group: 'organ', transparent: true, xrayOnly: true }));
    parts.push(spherePart(hindC, headR * 0.44, MAT.brain, { order: 0, group: 'organ', transparent: true, xrayOnly: true }));
    parts.push(spherePart([heartC[0], heartC[1], heartC[2] - heartR * 0.14], heartR * 0.82, MAT.heart, { order: 0, group: 'organ', pulse: true }));
    parts.push(ellipsoidPart(liverC, [heartR * 0.92, heartR * 0.70, heartR * 0.80], null, MAT.liver, { order: 0, group: 'organ', xrayOnly: true }));
    for (let i = 0; i < 18; i += 1) {
      const fr = axisFrame(0.1 + (0.78 - 0.1) * (i / 17));
      parts.push(spherePart(vMadd(fr.p, fr.dorsal, fr.r * 0.55), 0.02, MAT.spine, { order: 0, group: 'organ', xrayOnly: true }));
    }
    for (let i = 0; i < eyeFrames.length; i += 1) {
      const ef = eyeFrames[i];
      const er = headR * 0.135 * eyeSpot + 0.006;
      parts.push(ellipsoidPart(vMadd(ef.pos, ef.dir, er * 0.08), [er, er, er * 0.34], ef.basis, MAT.eyeDark, { order: 3, group: 'eye', transparent: true }));
      parts.push(ellipsoidPart(vMadd(ef.pos, ef.dir, er * 0.18), [er * 0.55, er * 0.55, er * 0.26], ef.basis, MAT.eyeLens, { order: 4, group: 'eye', transparent: true }));
    }
    parts.push(part(skinMesh, skinMat, { order: 1, group: 'skin', cull: 'back', transparent: skinAlpha < 0.999, animateSkin: true }));
    parts.push(spherePart(yolkC, yolkR, MAT.yolk, { order: 2, group: 'yolk', transparent: true }, true));
    const amnionR = 1.0 + 0.03 * (week - 5);
    parts.push(spherePart([0, 0, 0.12], amnionR, MAT.amnion, { order: 6, group: 'sac', cull: 'two', transparent: true }, true));
    parts.push(spherePart([0, 0, 0.12], amnionR * 1.24, MAT.chorion, { order: 7, group: 'sac', cull: 'two', transparent: true }, true));
    return { parts: parts, center: [0, -0.02, 0.2], radius: 0.84, bpm: fetalHeartRate(week) };
  }

  function buildFetusScene(week, opts) {
    const R = K(week, { 10: 0.37, 12: 0.34, 16: 0.315, 20: 0.292, 28: 0.282, 40: 0.276 });
    const torsoLen = K(week, { 10: 0.54, 12: 0.60, 16: 0.70, 20: 0.76, 28: 0.82, 40: 0.86 });
    const chestR = K(week, { 10: 0.21, 12: 0.22, 16: 0.235, 20: 0.25, 28: 0.275, 36: 0.298, 40: 0.31 });
    const bellyR = K(week, { 10: 0.23, 12: 0.24, 16: 0.25, 20: 0.262, 28: 0.286, 40: 0.315 });
    const limbR = K(week, { 10: 0.052, 12: 0.058, 16: 0.066, 20: 0.074, 28: 0.086, 36: 0.094, 40: 0.098 });
    const armU = K(week, { 10: 0.19, 12: 0.22, 16: 0.26, 20: 0.29, 28: 0.32, 40: 0.34 });
    const armL = K(week, { 10: 0.17, 12: 0.20, 16: 0.24, 20: 0.26, 28: 0.28, 40: 0.30 });
    const hand = K(week, { 10: 0.092, 12: 0.106, 16: 0.118, 20: 0.128, 28: 0.138, 40: 0.148 });
    const legU = K(week, { 10: 0.20, 12: 0.24, 16: 0.30, 20: 0.34, 28: 0.37, 40: 0.39 });
    const legL = K(week, { 10: 0.18, 12: 0.21, 16: 0.27, 20: 0.30, 28: 0.33, 40: 0.35 });
    const foot = K(week, { 10: 0.102, 12: 0.118, 16: 0.136, 20: 0.148, 28: 0.158, 40: 0.168 });
    const fingers = K(week, { 10: 0.70, 11: 0.88, 12: 1 });
    const plump = K(week, { 10: 0, 20: 0.18, 24: 0.36, 28: 0.60, 32: 0.80, 36: 0.94, 40: 1 });
    const curl = K(week, { 10: 0.65, 16: 0.56, 20: 0.52, 24: 0.54, 28: 0.58, 32: 0.62, 36: 0.66, 40: 0.70 });
    const eyeOpen = week >= 26;
    const vein = K(week, { 10: 0.36, 14: 0.28, 20: 0.16, 24: 0.10, 28: 0.05, 32: 0.02, 36: 0.01 });
    const vernix = K(week, { 18: 0, 20: 0.40, 28: 0.52, 36: 0.28, 40: 0.12 });
    const base = K(week, {
      10: [0.95, 0.65, 0.59],
      20: [0.96, 0.70, 0.64],
      28: [0.96, 0.74, 0.67],
      36: [0.97, 0.78, 0.71],
      40: [0.98, 0.80, 0.73]
    });
    const lateTerm = week >= 32;

    const X = [1, 0, 0], Y = [0, 1, 0], Z = [0, 0, 1];
    const S0 = [0, -torsoLen * 0.48, 0.02], S1 = [0, torsoLen * 0.50, 0], SM = [0, 0, -0.15 * curl];
    function spine(t) { return vLerp(vLerp(S0, SM, t), vLerp(SM, S1, t), t); }
    function spineDorsal(t) {
      const tangent = vNorm(vSub(spine(Math.min(t + 0.02, 1)), spine(Math.max(t - 0.02, 0))));
      return vNorm(vCross(tangent, X));
    }

    const rig = createRig();
    const kTorso = 0.072;
    // Smooth infant torso with tapered upper thorax so the neck and submental chin crease stay completely clear
    rigSphere(rig, vMadd(spine(0.81), Z, chestR * 0.08), chestR * 0.72, 0.05);
    rigSphere(rig, vMadd(spine(0.68), Z, chestR * 0.20), chestR * 0.90, kTorso);
    rigSphere(rig, vMadd(spine(0.46), Z, bellyR * 0.26), bellyR * 0.93, kTorso);
    rigSphere(rig, vMadd(spine(0.26), Z, bellyR * 0.18), chestR * 0.83, kTorso);
    rigSphere(rig, vMadd(spine(0.11), Z, chestR * 0.06), chestR * 0.74, kTorso);

    for (let s = -1; s <= 1; s += 2) {
      rigSphere(rig, vAdd(spine(0.82), [s * chestR * 0.78, -0.01, chestR * 0.05]), limbR * 1.12, 0.045);
      rigSphere(rig, vAdd(spine(0.12), [s * chestR * 0.36, -0.01, 0.0]), chestR * 0.48, 0.055);
    }

    /* ---------- Independent Infant Craniofacial Sub-Group (Crisp Jawline, Chin, Lips, Nose, Eyes & Ears!) ---------- */
    const neckTop = spine(1);
    const H = vAdd(neckTop, [0, R * 0.98, R * 0.14 * curl + 0.02]);
    const f = vNorm([0, -0.16 * curl, 1]);
    const r = X;
    const u = vNorm(vCross(f, r));
    const headBasis = { u: r, v: u, w: f };
    function hp(dr, du, df) {
      return vAdd(vAdd(vAdd(H, vScale(r, R * dr)), vScale(u, R * du)), vScale(f, R * df));
    }

    // Slender cervical neck column connecting thorax to the skull base (leaves a deep submental space under the chin)
    rigCone(rig, vAdd(neckTop, [0, -0.06, -R * 0.06]), hp(0, -0.66, -0.24), R * 0.29, R * 0.28, 0.038);

    const headGrp = createSubGroup(rig, 0.022, 0.010);

    // Cranial vault, smooth forehead dome, tapered midface/muzzle & distinct rounded chin
    rigEllipsoid(headGrp, hp(0, 0.12, -0.08), [R * 0.88, R * 0.92, R * 0.95], headBasis, 0.055);
    rigEllipsoid(headGrp, hp(0, 0.28, 0.16), [R * 0.75, R * 0.54, R * 0.75], headBasis, 0.060);
    rigEllipsoid(headGrp, hp(0, -0.28, 0.20), [R * 0.62, R * 0.46, R * 0.66], headBasis, 0.055);
    rigSphere(headGrp, hp(0, -0.58, 0.52), R * (0.20 + 0.02 * plump), 0.042);

    // Submental under-chin carve so jawline is crisp
    rigSphere(headGrp, hp(0, -0.82, 0.24), R * 0.22, 0.032, true);

    // Cute infant button nose in 'post' pass: bridge, upturned button tip & nostril wings
    rigCone(headGrp, hp(0, 0.02, 0.77), hp(0, -0.17, 0.92), R * 0.064, R * 0.094, 0.030, 'post');
    rigSphere(headGrp, hp(0, -0.18, 0.94), R * 0.096, 0.026, 'post');
    for (let s = -1; s <= 1; s += 2) {
      rigSphere(headGrp, hp(s * 0.088, -0.21, 0.86), R * 0.064, 0.024, 'post');
      rigCrease(rig, hp(s * 0.048, -0.24, 0.90), hp(s * 0.095, -0.245, 0.86), R * 0.034, R * 0.012, 0.48);
    }

    // Soft, flush infant upper Cupid's-bow lip & lower lip cushion + smooth analytical oral parting crease
    for (let s = -1; s <= 1; s += 2) {
      rigCone(headGrp, hp(0, -0.35, 0.79), hp(s * 0.135, -0.385, 0.73), R * 0.048, R * 0.036, 0.026, 'post');
    }
    rigCone(headGrp, hp(-0.105, -0.445, 0.765), hp(0.105, -0.445, 0.765), R * 0.045, R * 0.045, 0.026, 'post');
    rigCrease(rig, hp(-0.13, -0.398, 0.755), hp(0, -0.408, 0.808), R * 0.044, R * 0.018, 0.56);
    rigCrease(rig, hp(0, -0.408, 0.808), hp(0.13, -0.398, 0.755), R * 0.044, R * 0.018, 0.56);

    // Supraorbital brow arches, plump cheeks, C-shaped ears & serene sleeping infant eyelids
    const eyeCenters = [];
    for (let s = -1; s <= 1; s += 2) {
      rigCone(headGrp, hp(s * 0.12, 0.13, 0.79), hp(s * 0.46, 0.09, 0.66), R * 0.056, R * 0.046, 0.036, 'post');
      rigSphere(headGrp, hp(s * 0.41, -0.25, 0.46), R * (0.24 + 0.055 * plump), 0.054, 'post');

      const earC = hp(s * 0.89, -0.12, -0.05);
      const earBasis = {
        u: vNorm(vAdd(vScale(r, s * 0.92), vScale(f, -0.38))),
        v: u,
        w: vNorm(vAdd(vScale(f, 0.92), vScale(r, s * 0.38)))
      };
      rigEllipsoid(headGrp, earC, [R * 0.068, R * 0.175, R * 0.12], earBasis, 0.028, 'post');
      rigCone(
        headGrp,
        vAdd(earC, vAdd(vScale(u, R * 0.115), vScale(f, R * 0.028))),
        vAdd(earC, vAdd(vScale(u, -R * 0.095), vScale(f, -R * 0.045))),
        R * 0.038,
        R * 0.034,
        0.018,
        'post'
      );

      const eyeC = hp(s * 0.29, -0.02, 0.745);
      eyeCenters.push(eyeC);
      // Smooth, flush sleeping eyelid cushion + curved palpebral fissure (zero orbital moat, zero pinholes!)
      rigEllipsoid(headGrp, hp(s * 0.29, -0.015, 0.760), [R * 0.132, R * 0.082, R * 0.064], headBasis, 0.034, 'post');
      rigCrease(rig, hp(s * 0.175, -0.022, 0.795), hp(s * 0.29, -0.046, 0.822), R * 0.042, R * 0.016, 0.56);
      rigCrease(rig, hp(s * 0.29, -0.046, 0.822), hp(s * 0.405, -0.026, 0.765), R * 0.042, R * 0.016, 0.56);
    }

    /* ---------- Independent Upper & Lower Limb Sub-Groups (Plump, Smooth, Separated 5 Fingers & 5 Toes!) ---------- */
    const fingerRadius = Math.max(0.0185, hand * 0.122 * (0.85 + 0.15 * fingers));
    for (let s = -1; s <= 1; s += 2) {
      // Upper limb sub-group: smooth bicep, forearm, palm & 5 plump fanned baby fingers
      const armGrp = createSubGroup(rig, 0.015, 0.010);
      const sh = vAdd(spine(0.81), [s * chestR * 0.82, 0, chestR * 0.06]);
      const E = vMadd(sh, vNorm([s * 0.56, -0.66, 0.50]), armU);
      const W = vMadd(E, vNorm([-s * 0.42, 0.46, 0.78]), armL);
      rigCone(armGrp, sh, E, limbR * 0.96, limbR * 0.74, 0.014);
      rigCone(armGrp, E, W, limbR * 0.72, limbR * 0.50, 0.014);

      const d = vNorm(vSub(W, E));
      const n = vNorm(vSub([0, 0, -1], vScale(d, vDot([0, 0, -1], d))));
      const sd = vNorm(vCross(d, n));
      const Pc = vMadd(W, d, hand * 0.34);
      rigEllipsoid(armGrp, Pc, [hand * 0.38, hand * 0.16, hand * 0.34], { u: sd, v: n, w: d }, 0.018);
      if (fingers > 0.3) {
        const fl = hand * 0.48 * fingers;
        const dirBase = vNorm(vAdd(vScale(d, Math.cos(0.22)), vScale(n, Math.sin(0.22))));
        const fLens = [0.82, 0.95, 1.0, 0.92, 0.78];
        for (let i = 0; i < 4; i += 1) {
          const spread = (i - 1.5) * 0.28;
          const fDir = vNorm(vAdd(dirBase, vScale(sd, spread)));
          const b = vMadd(vMadd(Pc, d, hand * 0.26), sd, (i - 1.5) * hand * 0.24);
          const len = fl * fLens[i + 1];
          const tip = vMadd(b, fDir, len);
          rigCone(armGrp, b, tip, fingerRadius, fingerRadius * 0.86, 0.010, 'min');
        }
        const thumbSide = -s;
        const tb = vMadd(vMadd(Pc, sd, thumbSide * hand * 0.34), d, hand * 0.04);
        const tdir = vNorm(vAdd(vAdd(vScale(sd, thumbSide * 0.68), vScale(d, 0.70)), vScale(n, 0.16)));
        const ttip = vMadd(tb, tdir, hand * 0.36 * fingers);
        rigCone(armGrp, tb, ttip, fingerRadius * 1.06, fingerRadius * 0.88, 0.010, 'min');
      }

      // Lower limb sub-group: bowed frog-leg fetal posture + unwebbed knee & ankle + 5 plump baby toes
      const legGrp = createSubGroup(rig, 0.018, 0.010);
      const hip = vAdd(spine(0.12), [s * chestR * 0.52, -0.02, chestR * 0.06]);
      const Kn = vMadd(hip, vNorm([s * 0.68, 0.42 + 0.12 * curl, 0.74]), legU);
      const An = vMadd(Kn, vNorm([-s * 0.50, -0.80, 0.32]), legL);
      rigCone(legGrp, hip, Kn, limbR * 1.24, limbR * 0.90, 0.016);
      rigCone(legGrp, Kn, An, limbR * 0.86, limbR * 0.52, 0.014);
      const sDir = vNorm(vSub(An, Kn));
      const fd = vNorm(vAdd(vScale(sDir, 0.20), [0, -0.06, 1.0]));
      const fn = vNorm(vCross(fd, [s, 0, 0]));
      const fs = vCross(fn, fd);
      const Fc = vMadd(An, fd, foot * 0.40);
      rigEllipsoid(legGrp, Fc, [foot * 0.32, foot * 0.15, foot * 0.42], { u: fs, v: fn, w: fd }, 0.018);
      rigSphere(legGrp, vMadd(An, fd, -foot * 0.05), limbR * 0.54, 0.018);
      if (fingers > 0.3) {
        const halluxSide = -s;
        for (let i = 0; i < 5; i += 1) {
          const medialIdx = halluxSide > 0 ? (4 - i) : i;
          const tr = Math.max(0.0175, foot * (medialIdx === 0 ? 0.112 : (0.092 - medialIdx * 0.004)));
          const toeDir = vNorm(vAdd(fd, vScale(fs, (i - 2) * 0.16)));
          const b = vMadd(vMadd(Fc, fd, foot * 0.36), fs, (i - 2) * foot * 0.165);
          const toeLen = foot * (medialIdx === 0 ? 0.20 : (0.16 - medialIdx * 0.008)) * fingers;
          rigCone(legGrp, b, vMadd(b, toeDir, toeLen), tr, tr * 0.86, 0.010, 'min');
        }
      }
    }

    const skinMesh = rigToMesh(rig, opts.resolution || 118);

    const bodyXf = lateTerm ? m4Mul(m4RotZ(0.22), m4RotY(-0.08)) : m4RotY(0.0);
    function xf(p) { return m4TransformPoint(bodyXf, p); }

    let maxR = 0;
    const pos = skinMesh.positions;
    for (let i = 0; i < pos.length; i += 3) {
      const l = Math.sqrt(pos[i] * pos[i] + pos[i + 1] * pos[i + 1] + pos[i + 2] * pos[i + 2]);
      if (l > maxR) maxR = l;
    }
    const sacR = maxR * K(week, { 10: 1.5, 14: 1.32, 20: 1.2, 28: 1.12, 36: 1.06, 40: 1.04 });
    const sacC = [0, 0, 0.02];

    const skinMat = mat({
      base: base, sss: [1.0, 0.36, 0.24], sssAmt: K(week, { 10: 0.88, 16: 0.78, 20: 0.68, 28: 0.56, 40: 0.46 }),
      alpha: 1.0, rough: 0.36 - vernix * 0.12, spec: 0.44 + vernix * 0.28, vein: vein,
      fresnel: 0.42, rim: [1, 0.84, 0.76], noiseScale: 1, matType: 1
    });
    if (vernix > 0.01) {
      skinMat.base = [lerp(base[0], 0.98, vernix * 0.14), lerp(base[1], 0.92, vernix * 0.14), lerp(base[2], 0.86, vernix * 0.14)];
    }

    const parts = [];
    function bodyPart(p) { p.model = m4Mul(bodyXf, p.model); p.center = xf(p.center); return p; }

    parts.push(bodyPart(spherePart(vAdd(vMadd(spine(0.68), Z, chestR * 0.45), [-0.03, 0, 0]), chestR * 0.28, MAT.heart, { order: 0, group: 'organ', pulse: true, xrayOnly: true })));
    parts.push(bodyPart(ellipsoidPart(vAdd(vMadd(spine(0.46), Z, bellyR * 0.45), [0.05, 0, 0]), [bellyR * 0.48, bellyR * 0.30, bellyR * 0.34], null, MAT.liver, { order: 0, group: 'organ', xrayOnly: true })));
    parts.push(bodyPart(ellipsoidPart(hp(0, 0.12, 0), [R * 0.72, R * 0.70, R * 0.78], null, MAT.brain, { order: 0, group: 'organ', transparent: true, xrayOnly: true })));
    for (let i = 0; i < 18; i += 1) {
      const t = 0.06 + 0.88 * (i / 17);
      parts.push(bodyPart(spherePart(vMadd(spine(t), spineDorsal(t), chestR * 0.65), limbR * 0.38, MAT.spine, { order: 0, group: 'organ', xrayOnly: true })));
    }
    for (let i = 0; i < eyeCenters.length; i += 1) {
      const ec = eyeCenters[i];
      parts.push(bodyPart(spherePart(vMadd(ec, f, -R * 0.02), R * 0.115, MAT.sclera, { order: 0, group: 'eye', xrayOnly: true })));
      if (eyeOpen) {
        parts.push(bodyPart(ellipsoidPart(vMadd(ec, f, R * 0.065), [R * 0.072, R * 0.072, R * 0.028], headBasis, MAT.iris, { order: 0, group: 'eye', xrayOnly: true })));
      }
    }
    parts.push(bodyPart(part(skinMesh, skinMat, { order: 1, group: 'skin', cull: 'back', transparent: false, animateSkin: true })));

    // Umbilical cord: arcs cleanly from the navel through the open corridor between elbow and knee to the placenta
    const navelLocal = vMadd(spine(0.36), Z, bellyR * 1.12);
    const placentaDir = vNorm([-0.78, 0.24, -0.56]);
    const placentaC = vMadd(sacC, placentaDir, sacR * 0.93);
    const cordCtrl = [
      xf(navelLocal),
      xf(vAdd(navelLocal, [-0.08, 0.01, 0.14])),
      xf([-bellyR * 1.52, -0.02, 0.20]),
      vMadd(placentaC, placentaDir, -0.18),
      placentaC
    ];
    const cordPath = catmullRom(cordCtrl, 10);
    for (let i = 1; i < cordPath.length - 1; i += 1) {
      const t = i / (cordPath.length - 1);
      const tangent = vNorm(vSub(cordPath[i + 1], cordPath[i - 1]));
      const helper = Math.abs(tangent[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0];
      const nrm = vNorm(vCross(tangent, helper));
      const bin = vCross(tangent, nrm);
      const env = Math.sin(t * PI) * 0.028;
      cordPath[i] = vAdd(vAdd(cordPath[i], vScale(nrm, Math.cos(t * PI * 6) * env)), vScale(bin, Math.sin(t * PI * 6) * env));
    }
    const cordR = K(week, { 10: 0.028, 20: 0.040, 40: 0.050 });
    parts.push(part(buildTube(cordPath, function () { return cordR; }, 18, true), MAT.cord, { order: 2, group: 'cord', cull: 'none', transparent: true }));

    // Placenta disc on the inner uterine wall with lobulated cotyledons.
    const placentaMesh = buildUvSphere(64, 40, function (x, y, z) {
      return 1 + 0.085 * (fbm3(x * 5 + 1, y * 5, z * 5, 3) - 0.5);
    });
    const pw = placentaDir;
    const pu = vNorm(vCross(pw, [0, 1, 0]));
    const pv = vCross(pw, pu);
    const placentaScale = sacR * K(week, { 10: 0.38, 16: 0.46, 28: 0.5, 40: 0.52 });
    parts.push(ellipsoidPart(placentaC, [placentaScale, placentaScale, placentaScale * 0.28], { u: pu, v: pv, w: pw }, MAT.placenta, { order: 0, group: 'placenta' }));
    parts[parts.length - 1].mesh = placentaMesh;

    if (week <= 11) {
      parts.push(spherePart(vMadd(sacC, vNorm([-0.6, -0.5, 0.6]), sacR * 0.78), 0.11, MAT.yolk, { order: 2, group: 'yolk', transparent: true }));
    }
    parts.push(spherePart(sacC, sacR, MAT.amnion, { order: 6, group: 'sac', cull: 'two', transparent: true }, true));
    parts.push(spherePart(sacC, sacR * 1.09, week <= 13 ? MAT.chorion : MAT.uterus, { order: 7, group: 'sac', cull: 'two', transparent: true }, true));

    return { parts: parts, center: sacC.slice(), radius: maxR * 1.04, bpm: fetalHeartRate(week) };
  }

  function buildSceneData(week, opts) {
    const o = opts || {};
    const w = clamp(Math.round(week), 1, 42);
    let scene;
    if (w <= 2) scene = buildOocyteScene(w);
    else if (w === 3) scene = buildMorulaScene();
    else if (w === 4) scene = buildBlastocystScene();
    else if (w <= 9) scene = buildEmbryoScene(w, { resolution: o.embryoResolution || 96 });
    else scene = buildFetusScene(w, { resolution: o.fetusResolution || 118 });
    scene.week = w;
    return scene;
  }

  /* ======================================================================
     WebGL Shaders:
     1) Main PBR Subsurface + Derivative Micro-Bump + Distortion-Free Motion
     2) Intrauterine Volumetric Backlight + 3D Floating Amniotic Particles
     ====================================================================== */
  const VERT_SRC = [
    'attribute vec3 aPosition;',
    'attribute vec3 aNormal;',
    'attribute vec2 aSurface;',
    'uniform mat4 uModel;',
    'uniform mat4 uViewProj;',
    'uniform mat3 uNormalMat;',
    'uniform float uTime;',
    'uniform float uAnimAmp;',
    'uniform float uKickEnv;',
    'uniform float uAnimateSkin;',
    'varying vec3 vWorld;',
    'varying vec3 vNormal;',
    'varying vec3 vLocal;',
    'varying vec2 vSurface;',
    'void main() {',
    '  vec3 pos = aPosition;',
    '  vec3 nrm = aNormal;',
    '  if (uAnimateSkin > 0.5 && (uAnimAmp > 0.001 || uKickEnv > 0.001)) {',
    '    float t = uTime;',
    '    float k = uKickEnv;',
    '    float breath = sin(t * 2.2) * 0.007 * uAnimAmp;',
    '    float chestMask = exp(-pos.y * pos.y * 14.0) * smoothstep(-0.02, 0.22, pos.z) * (1.0 - smoothstep(0.14, 0.24, abs(pos.x)));',
    '    pos += nrm * breath * chestMask;',
    '    float lowerMask = smoothstep(-0.04, -0.26, pos.y) * smoothstep(0.05, 0.32, pos.z);',
    '    float sideSign = pos.x >= 0.0 ? 1.0 : -1.0;',
    '    float kick = (max(0.0, sin(t * 1.25 + sideSign * 1.5)) * 0.010 * uAnimAmp + sin(t * 13.0 - sideSign * 0.7) * 0.075 * k) * lowerMask;',
    '    pos.z += kick;',
    '    pos.y -= kick * 0.35;',
    '  }',
    '  vec4 wp = uModel * vec4(pos, 1.0);',
    '  vWorld = wp.xyz;',
    '  vNormal = normalize(uNormalMat * nrm);',
    '  vLocal = aPosition;',
    '  vSurface = aSurface;',
    '  gl_Position = uViewProj * wp;',
    '}'
  ].join('\n');

  const FRAG_SRC = [
    '#extension GL_OES_standard_derivatives : enable',
    '#ifdef GL_FRAGMENT_PRECISION_HIGH',
    'precision highp float;',
    '#else',
    'precision mediump float;',
    '#endif',
    'varying vec3 vWorld;',
    'varying vec3 vNormal;',
    'varying vec3 vLocal;',
    'varying vec2 vSurface;',
    'uniform vec3 uCamPos;',
    'uniform vec3 uBase;',
    'uniform vec3 uSss;',
    'uniform vec3 uRim;',
    'uniform vec3 uEmissive;',
    'uniform vec3 uNoiseOffset;',
    'uniform float uSssAmt;',
    'uniform float uAlpha;',
    'uniform float uRough;',
    'uniform float uSpec;',
    'uniform float uVein;',
    'uniform float uCell;',
    'uniform float uFresnel;',
    'uniform float uNoiseScale;',
    'uniform float uMatType;',
    'uniform float uPulse;',
    'uniform float uTime;',
    'uniform float uKickEnv;',
    'float hash31(vec3 p) {',
    '  p = fract(p * 0.3183099 + vec3(0.11, 0.17, 0.13));',
    '  p *= 17.0;',
    '  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));',
    '}',
    'float vnoise(vec3 x) {',
    '  vec3 i = floor(x);',
    '  vec3 f = fract(x);',
    '  f = f * f * (3.0 - 2.0 * f);',
    '  return mix(mix(mix(hash31(i), hash31(i + vec3(1.0, 0.0, 0.0)), f.x),',
    '                 mix(hash31(i + vec3(0.0, 1.0, 0.0)), hash31(i + vec3(1.0, 1.0, 0.0)), f.x), f.y),',
    '             mix(mix(hash31(i + vec3(0.0, 0.0, 1.0)), hash31(i + vec3(1.0, 0.0, 1.0)), f.x),',
    '                 mix(hash31(i + vec3(0.0, 1.0, 1.0)), hash31(i + vec3(1.0, 1.0, 1.0)), f.x), f.y), f.z);',
    '}',
    'float fbm(vec3 p) {',
    '  float v = 0.0;',
    '  float a = 0.5;',
    '  for (int i = 0; i < 4; i++) {',
    '    v += a * vnoise(p);',
    '    p = p * 2.07 + vec3(3.1, 1.7, 9.2);',
    '    a *= 0.5;',
    '  }',
    '  return v;',
    '}',
    'vec3 hash33(vec3 p) {',
    '  p = vec3(dot(p, vec3(127.1, 311.7, 74.7)), dot(p, vec3(269.5, 183.3, 246.1)), dot(p, vec3(113.5, 271.9, 124.6)));',
    '  return fract(sin(p) * 43758.5453);',
    '}',
    'float worley(vec3 p) {',
    '  vec3 i = floor(p);',
    '  vec3 f = fract(p);',
    '  float d = 8.0;',
    '  for (int x = -1; x <= 1; x++) {',
    '    for (int y = -1; y <= 1; y++) {',
    '      for (int z = -1; z <= 1; z++) {',
    '        vec3 g = vec3(float(x), float(y), float(z));',
    '        vec3 o = hash33(i + g);',
    '        vec3 r = g + o - f;',
    '        d = min(d, dot(r, r));',
    '      }',
    '    }',
    '  }',
    '  return sqrt(d);',
    '}',
    'void main() {',
    '  vec3 N = normalize(vNormal);',
    '  if (!gl_FrontFacing) N = -N;',
    '  vec3 V = normalize(uCamPos - vWorld);',
    '  vec3 P = vLocal * uNoiseScale + uNoiseOffset;',
    '  float thickness = clamp(vSurface.x, 0.08, 1.0);',
    '  float ao = clamp(vSurface.y, 0.35, 1.0);',
    '',
    '  // --- 1. Crystal-Clear Amniotic Sac & Chorion Membrane (uMatType == 2) ---',
    '  if (abs(uMatType - 2.0) < 0.3) {',
    '    float ndv = abs(dot(N, V));',
    '    float rim = pow(1.0 - ndv, 3.4);',
    '    float edgeMask = smoothstep(0.18, 0.85, 1.0 - ndv);',
    '    float ripple = sin(vLocal.y * 20.0 - uTime * 5.0) * 0.04 * uKickEnv;',
    '    vec3 L1 = normalize(vec3(0.65, 0.78, 0.35));',
    '    vec3 H1 = normalize(L1 + V);',
    '    float spec = pow(max(dot(N, H1), 0.0), 220.0) * 0.95 * edgeMask;',
    '    float caust = (fbm(P * 3.8 + vec3(0.0, uTime * 0.08, 0.0)) - 0.5) * 0.12;',
    '    vec3 col = mix(uBase, uRim, 0.65) * (rim * (0.85 + caust + ripple)) + vec3(1.0, 0.97, 0.94) * spec;',
    '    float memAlpha = clamp(uAlpha * 0.2 + rim * 0.34 * uFresnel + spec * 0.5 + abs(ripple) * 0.55 * edgeMask, 0.0, 0.72);',
    '    gl_FragColor = vec4(col * memAlpha, memAlpha);',
    '    return;',
    '  }',
    '',
    '  vec3 base = uBase;',
    '  float height = 0.0;',
    '  float bumpStrength = 0.0;',
    '',
    '  // --- 2. Silky Epidermal Micro-Relief & Delicate Subcutaneous Capillaries ---',
    '  if (abs(uMatType - 1.0) < 0.3) {',
    '    float micro = vnoise(P * 32.0) * 0.6 + vnoise(P * 68.0) * 0.4;',
    '    height += (micro - 0.5) * 0.04;',
    '    bumpStrength = 0.015;',
    '    float blush = pow(1.0 - thickness, 1.6) * 0.26 + (1.0 - ao) * 0.12;',
    '    base = mix(base, vec3(0.95, 0.52, 0.48), clamp(blush, 0.0, 0.28));',
    '  }',
    '',
    '  if (uVein > 0.001) {',
    '    vec3 q = P * 5.6 + vec3(fbm(P * 3.0), fbm(P * 3.0 + 4.1), fbm(P * 3.0 + 8.3)) * 0.8;',
    '    float r1 = 1.0 - abs(2.0 * vnoise(q) - 1.0);',
    '    float r2 = 1.0 - abs(2.0 * vnoise(q * 2.1 + 7.3) - 1.0);',
    '    float mainVein = pow(clamp(r1, 0.0, 1.0), 13.0);',
    '    float capVein = pow(clamp(r2, 0.0, 1.0), 16.0) * smoothstep(0.5, 0.95, r1);',
    '    float vMask = clamp(mainVein * 0.75 + capVein * 0.45, 0.0, 1.0) * uVein;',
    '    vMask *= (0.4 + 0.6 * (1.0 - thickness * 0.5));',
    '    vec3 veinCol = mix(vec3(0.62, 0.22, 0.26), vec3(0.46, 0.24, 0.38), capVein);',
    '    base = mix(base, veinCol, clamp(vMask * 0.45, 0.0, 0.48));',
    '    height += vMask * 0.08;',
    '    bumpStrength = max(bumpStrength, 0.022);',
    '  }',
    '',
    '  // --- 3. Umbilical Cord Wharton Jelly & Traveling Arterial Pulse (uMatType == 3) ---',
    '  if (abs(uMatType - 3.0) < 0.3) {',
    '    float cordU = vSurface.x;',
    '    float vesselMask = smoothstep(0.62, 0.96, 1.0 - ao);',
    '    float pulseWave = 0.5 + 0.5 * sin(cordU * 18.0 - uTime * 8.5);',
    '    float artGlow = (0.35 + 0.65 * uPulse * pulseWave) * (0.4 + 0.6 * vesselMask);',
    '    base = mix(base, vec3(0.66, 0.14, 0.20), vesselMask * 0.52 + artGlow * 0.25);',
    '    height += (1.0 - ao) * 0.25 + (vnoise(P * 22.0) - 0.5) * 0.04;',
    '    bumpStrength = 0.05;',
    '  }',
    '',
    '  // --- 4. Placental Cotyledons & Endometrial Decidua (uMatType == 4) ---',
    '  if (uCell > 0.001) {',
    '    float w = worley(P * 5.2);',
    '    float edge = smoothstep(0.28, 0.92, w);',
    '    base = mix(base, base * 0.52, edge * uCell);',
    '    base += vec3(0.09, 0.04, 0.04) * (1.0 - edge) * uCell * 0.50;',
    '    height -= edge * 0.18 * uCell;',
    '    bumpStrength = max(bumpStrength, 0.06 * uCell);',
    '  }',
    '',
    '  // --- 5. Screen-Space Derivative Micro-Normal Perturbation ---',
    '#ifdef GL_OES_standard_derivatives',
    '  if (bumpStrength > 0.001) {',
    '    vec3 dpdx = dFdx(vWorld);',
    '    vec3 dpdy = dFdy(vWorld);',
    '    float dhdx = dFdx(height);',
    '    float dhdy = dFdy(height);',
    '    vec3 r1 = cross(dpdy, N);',
    '    vec3 r2 = cross(N, dpdx);',
    '    float det = dot(dpdx, r1);',
    '    if (abs(det) > 1e-8) {',
    '      vec3 surfGrad = (r1 * dhdx + r2 * dhdy) / det;',
    '      N = normalize(N - surfGrad * bumpStrength);',
    '    }',
    '  }',
    '#endif',
    '',
    '  // --- 6. Three-Point Macro Studio + Warm Intrauterine Backlighting ---',
    '  vec3 L1 = normalize(vec3(0.48, 0.62, 0.84));',
    '  vec3 L2 = normalize(vec3(-0.78, 0.22, 0.44));',
    '  vec3 L3 = normalize(vec3(0.12, 0.35, -0.96));',
    '  float wrap = 0.32 + 0.52 * uSssAmt;',
    '  float nl1 = dot(N, L1);',
    '  float d1 = clamp((nl1 + wrap) / (1.0 + wrap), 0.0, 1.0);',
    '  float d2 = clamp((dot(N, L2) + wrap) / (1.0 + wrap), 0.0, 1.0);',
    '  float d3 = clamp(dot(N, L3), 0.0, 1.0);',
    '',
    '  float creaseShadow = mix(0.68, 1.0, ao);',
    '  vec3 creaseTint = mix(vec3(0.82, 0.56, 0.52), vec3(1.0), smoothstep(0.35, 0.92, ao));',
    '  vec3 ambient = mix(vec3(0.20, 0.10, 0.10), vec3(0.32, 0.23, 0.21), 0.5 + 0.5 * N.y) * creaseShadow;',
    '',
    '  float terminator = smoothstep(-0.38, 0.08, nl1) * (1.0 - smoothstep(0.05, 0.52, nl1));',
    '  vec3 termScatter = uSss * terminator * 0.26 * uSssAmt * (1.2 - 0.4 * thickness);',
    '',
    '  vec3 diffuse = base * creaseTint * (d1 * vec3(1.04, 0.96, 0.91) * (0.66 + 0.34 * ao) + d2 * vec3(0.44, 0.36, 0.40) * creaseShadow + d3 * vec3(0.28, 0.16, 0.15) + ambient) + termScatter;',
    '',
    '  // --- 7. Physically Inspired Optical Thickness Subsurface Transmission (Beer-Lambert) ---',
    '  float optDepth = thickness * mix(2.2, 0.90, uSssAmt);',
    '  vec3 sigma = vec3(1.05, 3.0, 5.0);',
    '  vec3 transmittance = exp(-optDepth * sigma);',
    '  float backLight1 = pow(clamp(dot(V, -L1 + N * 0.38), 0.0, 1.0), 2.4);',
    '  float backLight3 = pow(clamp(dot(V, -L3 + N * 0.42), 0.0, 1.0), 1.8);',
    '  float viewRimSub = pow(1.0 - max(dot(N, V), 0.0), 2.2) * (1.1 - 0.65 * thickness);',
    '  vec3 sss = uSss * transmittance * (backLight1 * 0.52 + backLight3 * 0.90 + viewRimSub * 0.62 + 0.16 * (1.0 - thickness)) * uSssAmt * 1.12;',
    '',
    '  // --- 8. Dual-Lobe Specular (Epidermal Roughness + Glistening Wet Amniotic Clearcoat) ---',
    '  vec3 H1 = normalize(L1 + V);',
    '  vec3 H2 = normalize(L2 + V);',
    '  float shinBroad = mix(56.0, 8.0, uRough);',
    '  float specBroad = pow(max(dot(N, H1), 0.0), shinBroad) * uSpec * 0.48 + pow(max(dot(N, H2), 0.0), shinBroad * 0.6) * uSpec * 0.20;',
    '  float coatMask = (0.45 + 0.55 * ao);',
    '  float specWet = (pow(max(dot(N, H1), 0.0), 180.0) * 0.65 + pow(max(dot(N, H2), 0.0), 85.0) * 0.22) * uSpec * coatMask;',
    '  vec3 specCol = vec3(1.0, 0.96, 0.93) * specBroad + vec3(1.0, 0.98, 0.96) * specWet;',
    '',
    '  float fres = pow(1.0 - max(dot(N, V), 0.0), 3.1);',
    '  vec3 rimCol = uRim * fres * uFresnel * (0.55 + 0.45 * ao);',
    '',
    '  vec3 color = diffuse + sss + specCol + rimCol + uEmissive;',
    '  float alpha = clamp(uAlpha + fres * uFresnel * 0.55 * (1.0 - uAlpha), 0.0, 1.0);',
    '',
    '  color = (color * (2.51 * color + 0.03)) / (color * (2.43 * color + 0.59) + 0.14);',
    '  color = pow(clamp(color, 0.0, 1.0), vec3(0.95));',
    '  gl_FragColor = vec4(color * alpha, alpha);',
    '}'
  ].join('\n');

  /* ---------- Intrauterine Volumetric Backlight & 3D Amniotic Particles Shaders ---------- */
  const BG_VERT_SRC = [
    'attribute vec2 aQuad;',
    'varying vec2 vUv;',
    'void main() {',
    '  vUv = aQuad * 0.5 + 0.5;',
    '  gl_Position = vec4(aQuad, 0.999, 1.0);',
    '}'
  ].join('\n');

  const BG_FRAG_SRC = [
    '#ifdef GL_FRAGMENT_PRECISION_HIGH',
    'precision highp float;',
    '#else',
    'precision mediump float;',
    '#endif',
    'varying vec2 vUv;',
    'uniform float uTime;',
    'uniform float uPulse;',
    'uniform float uKickEnv;',
    'void main() {',
    '  vec2 p = vUv * 2.0 - 1.0;',
    '  p.y -= 0.04;',
    '  float r2 = dot(p, p);',
    '  float halo = exp(-r2 * 1.9);',
    '  float core = exp(-dot(p - vec2(-0.08, 0.12), p - vec2(-0.08, 0.12)) * 3.4);',
    '  float caustic = sin(p.x * 5.5 + uTime * 0.45) * cos(p.y * 5.0 - uTime * 0.35) * 0.04;',
    '  float ripple = sin(sqrt(r2) * 18.0 - uTime * 7.0) * exp(-r2 * 2.5) * 0.08 * uKickEnv;',
    '  vec3 colHalo = vec3(0.42, 0.09, 0.11) * (halo + caustic + ripple);',
    '  vec3 colCore = vec3(0.68, 0.21, 0.15) * core * (0.88 + 0.22 * uPulse);',
    '  vec3 col = colHalo + colCore;',
    '  float a = clamp(halo * 0.58 + core * 0.26, 0.0, 0.76);',
    '  gl_FragColor = vec4(col * a, a);',
    '}'
  ].join('\n');

  const PARTICLE_VERT_SRC = [
    'attribute vec3 aSeed;',
    'attribute float aSize;',
    'uniform mat4 uViewProj;',
    'uniform vec3 uCenter;',
    'uniform float uRadius;',
    'uniform float uTime;',
    'uniform float uDpr;',
    'varying float vAlpha;',
    'void main() {',
    '  float t = uTime * 0.16 + aSeed.z * 6.2831;',
    '  vec3 drift = vec3(sin(t + aSeed.y * 5.0), cos(t * 0.8 + aSeed.x * 4.0), sin(t * 0.6 + aSeed.z * 3.0)) * 0.075;',
    '  vec3 wp = uCenter + (aSeed + drift) * (uRadius * 1.18);',
    '  gl_Position = uViewProj * vec4(wp, 1.0);',
    '  gl_PointSize = clamp(aSize * uDpr * (2.6 / max(gl_Position.w, 0.4)), 1.5, 9.0);',
    '  vAlpha = 0.22 + 0.22 * sin(uTime * 1.1 + aSeed.x * 12.0);',
    '}'
  ].join('\n');

  const PARTICLE_FRAG_SRC = [
    '#ifdef GL_FRAGMENT_PRECISION_HIGH',
    'precision highp float;',
    '#else',
    'precision mediump float;',
    '#endif',
    'varying float vAlpha;',
    'void main() {',
    '  vec2 c = gl_PointCoord * 2.0 - 1.0;',
    '  float r2 = dot(c, c);',
    '  if (r2 > 1.0) discard;',
    '  float soft = pow(1.0 - r2, 1.8);',
    '  vec3 col = vec3(1.0, 0.86, 0.78);',
    '  float a = soft * vAlpha;',
    '  gl_FragColor = vec4(col * a, a);',
    '}'
  ].join('\n');

  function compileShader(gl, type, src) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      const info = gl.getShaderInfoLog(sh);
      gl.deleteShader(sh);
      throw new Error('Shader compile failed: ' + info);
    }
    return sh;
  }

  function createProgram(gl) {
    const prog = gl.createProgram();
    gl.attachShader(prog, compileShader(gl, gl.VERTEX_SHADER, VERT_SRC));
    gl.attachShader(prog, compileShader(gl, gl.FRAGMENT_SHADER, FRAG_SRC));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      throw new Error('Program link failed: ' + gl.getProgramInfoLog(prog));
    }
    const names = [
      'uModel', 'uViewProj', 'uNormalMat', 'uCamPos', 'uBase', 'uSss', 'uRim', 'uEmissive', 'uNoiseOffset',
      'uSssAmt', 'uAlpha', 'uRough', 'uSpec', 'uVein', 'uCell', 'uFresnel', 'uNoiseScale',
      'uMatType', 'uPulse', 'uTime', 'uAnimAmp', 'uKickEnv', 'uAnimateSkin'
    ];
    const loc = {};
    for (let i = 0; i < names.length; i += 1) loc[names[i]] = gl.getUniformLocation(prog, names[i]);
    return {
      prog: prog,
      loc: loc,
      aPosition: gl.getAttribLocation(prog, 'aPosition'),
      aNormal: gl.getAttribLocation(prog, 'aNormal'),
      aSurface: gl.getAttribLocation(prog, 'aSurface')
    };
  }

  function createBgProgram(gl) {
    const prog = gl.createProgram();
    gl.attachShader(prog, compileShader(gl, gl.VERTEX_SHADER, BG_VERT_SRC));
    gl.attachShader(prog, compileShader(gl, gl.FRAGMENT_SHADER, BG_FRAG_SRC));
    gl.linkProgram(prog);
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    return {
      prog: prog,
      vbo: vbo,
      aQuad: gl.getAttribLocation(prog, 'aQuad'),
      uTime: gl.getUniformLocation(prog, 'uTime'),
      uPulse: gl.getUniformLocation(prog, 'uPulse'),
      uKickEnv: gl.getUniformLocation(prog, 'uKickEnv')
    };
  }

  function createParticleProgram(gl) {
    const prog = gl.createProgram();
    gl.attachShader(prog, compileShader(gl, gl.VERTEX_SHADER, PARTICLE_VERT_SRC));
    gl.attachShader(prog, compileShader(gl, gl.FRAGMENT_SHADER, PARTICLE_FRAG_SRC));
    gl.linkProgram(prog);
    const count = 88;
    const rng = mulberry32(901);
    const data = new Float32Array(count * 4);
    for (let i = 0; i < count; i += 1) {
      const th = rng() * 2 * PI;
      const phi = Math.acos(2 * rng() - 1);
      const rad = 0.38 + 0.58 * Math.cbrt(rng());
      data[i * 4] = rad * Math.sin(phi) * Math.cos(th);
      data[i * 4 + 1] = rad * Math.cos(phi);
      data[i * 4 + 2] = rad * Math.sin(phi) * Math.sin(th);
      data[i * 4 + 3] = 1.6 + rng() * 2.8;
    }
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    return {
      prog: prog,
      vbo: vbo,
      count: count,
      aSeed: gl.getAttribLocation(prog, 'aSeed'),
      aSize: gl.getAttribLocation(prog, 'aSize'),
      uViewProj: gl.getUniformLocation(prog, 'uViewProj'),
      uCenter: gl.getUniformLocation(prog, 'uCenter'),
      uRadius: gl.getUniformLocation(prog, 'uRadius'),
      uTime: gl.getUniformLocation(prog, 'uTime'),
      uDpr: gl.getUniformLocation(prog, 'uDpr')
    };
  }

  function uploadMesh(gl, mesh) {
    if (mesh.gpu) return mesh.gpu;
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, mesh.positions, gl.STATIC_DRAW);
    const nbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, nbo);
    gl.bufferData(gl.ARRAY_BUFFER, mesh.normals, gl.STATIC_DRAW);
    const sbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sbo);
    gl.bufferData(gl.ARRAY_BUFFER, mesh.surface, gl.STATIC_DRAW);
    const ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, mesh.indices, gl.STATIC_DRAW);
    mesh.gpu = { vbo: vbo, nbo: nbo, sbo: sbo, ibo: ibo, count: mesh.indices.length };
    return mesh.gpu;
  }

  function disposeMesh(gl, mesh) {
    if (!mesh.gpu || mesh.shared) return;
    gl.deleteBuffer(mesh.gpu.vbo);
    gl.deleteBuffer(mesh.gpu.nbo);
    if (mesh.gpu.sbo) gl.deleteBuffer(mesh.gpu.sbo);
    gl.deleteBuffer(mesh.gpu.ibo);
    mesh.gpu = null;
  }

  function heartbeatPulse(timeSec, bpm) {
    if (!bpm) return 0;
    const phase = (timeSec * bpm / 60) % 1;
    const lub = Math.exp(-((phase - 0.1) * (phase - 0.1)) / 0.0045);
    const dub = 0.45 * Math.exp(-((phase - 0.36) * (phase - 0.36)) / 0.006);
    return Math.min(1, lub + dub);
  }

  function createViewer(container, options) {
    const opts = options || {};
    const canvas = document.createElement('canvas');
    canvas.className = 'atlas3d-canvas';
    canvas.tabIndex = 0;
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', 'Interactive 3D embryo and fetus model. Drag or use arrow keys to rotate, plus and minus to zoom, click or press K for a gentle fetal kick, R to reset.');
    container.appendChild(canvas);

    const ctxOpts = { alpha: true, antialias: true, premultipliedAlpha: true, powerPreference: 'high-performance', preserveDrawingBuffer: !!opts.preserveDrawingBuffer };
    let gl = null;
    try {
      gl = canvas.getContext('webgl2', ctxOpts) || canvas.getContext('webgl', ctxOpts) || canvas.getContext('experimental-webgl', ctxOpts);
    } catch (_e) {
      gl = null;
    }
    if (!gl) {
      canvas.remove();
      return {
        supported: false,
        destroy: function () {},
        setWeek: function () {},
        setActive: function () {},
        setOptions: function () {},
        resetView: function () {},
        triggerKick: function () {},
        toggleAudio: function () { return false; },
        getState: function () { return {}; }
      };
    }
    const isWebGL2 = (typeof WebGL2RenderingContext !== 'undefined') && (gl instanceof WebGL2RenderingContext);
    if (!isWebGL2) {
      gl.getExtension('OES_element_index_uint');
      gl.getExtension('OES_standard_derivatives');
    }

    const program = createProgram(gl);
    const bgProgram = createBgProgram(gl);
    const particleProgram = createParticleProgram(gl);
    gl.useProgram(program.prog);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const reducedMotion = (typeof window !== 'undefined' && window.matchMedia) ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
    const lowPower = (typeof navigator !== 'undefined' && navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
    const quality = { embryoResolution: lowPower ? 84 : 100, fetusResolution: lowPower ? 98 : 122 };

    const state = {
      yaw: 0.36, pitch: -0.04, zoom: 1,
      autoRotate: opts.autoRotate !== undefined ? !!opts.autoRotate : !reducedMotion,
      xray: false, showSac: true, active: true,
      lastInteract: 0, scene: null, week: null, building: false,
      pulseAmp: reducedMotion ? 0 : 1,
      kickTime: -100,
      audioEnabled: false
    };
    const cache = new Map();
    const MAX_CACHE = 12;
    let rafId = 0;
    let lastFrame = 0;
    let buildTimer = 0;
    let prefetchTimer = 0;
    const time0 = (typeof performance !== 'undefined' ? performance.now() : Date.now());

    function now() { return (typeof performance !== 'undefined' ? performance.now() : Date.now()); }

    /* ---------- Live Obstetric Ultrasound Doppler Synthesizer (Web Audio API) ---------- */
    let audioCtx = null;
    let noiseBuffer = null;
    let lastBeatIdx = -1;

    function ensureAudioContext() {
      if (audioCtx) return audioCtx;
      const AudioCtor = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtor) return null;
      try {
        audioCtx = new AudioCtor();
        const sr = audioCtx.sampleRate;
        noiseBuffer = audioCtx.createBuffer(1, sr * 1.0, sr);
        const ch = noiseBuffer.getChannelData(0);
        for (let i = 0; i < ch.length; i += 1) ch[i] = Math.random() * 2 - 1;
      } catch (_e) {
        audioCtx = null;
      }
      return audioCtx;
    }

    function playDopplerPulse(bpm) {
      if (!state.audioEnabled || !state.active || !bpm || bpm <= 0) return;
      const ctx = ensureAudioContext();
      if (!ctx || ctx.state !== 'running') return;
      const t0 = ctx.currentTime;

      function scheduleStroke(offsetSec, freqStart, freqEnd, gainPeak, durSec) {
        const osc = ctx.createOscillator();
        const gOsc = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freqStart, t0 + offsetSec);
        osc.frequency.exponentialRampToValueAtTime(freqEnd, t0 + offsetSec + durSec);
        gOsc.gain.setValueAtTime(0.0001, t0 + offsetSec);
        gOsc.gain.linearRampToValueAtTime(gainPeak * 0.24, t0 + offsetSec + 0.016);
        gOsc.gain.exponentialRampToValueAtTime(0.0001, t0 + offsetSec + durSec);
        osc.connect(gOsc);
        gOsc.connect(ctx.destination);
        osc.start(t0 + offsetSec);
        osc.stop(t0 + offsetSec + durSec + 0.01);

        if (noiseBuffer) {
          const src = ctx.createBufferSource();
          src.buffer = noiseBuffer;
          const bp = ctx.createBiquadFilter();
          bp.type = 'bandpass';
          bp.frequency.setValueAtTime(freqStart * 4.2, t0 + offsetSec);
          bp.frequency.exponentialRampToValueAtTime(freqEnd * 3.1, t0 + offsetSec + durSec);
          bp.Q.value = 3.2;
          const gNoise = ctx.createGain();
          gNoise.gain.setValueAtTime(0.0001, t0 + offsetSec);
          gNoise.gain.linearRampToValueAtTime(gainPeak * 0.18, t0 + offsetSec + 0.022);
          gNoise.gain.exponentialRampToValueAtTime(0.0001, t0 + offsetSec + durSec);
          src.connect(bp);
          bp.connect(gNoise);
          gNoise.connect(ctx.destination);
          src.start(t0 + offsetSec);
          src.stop(t0 + offsetSec + durSec + 0.01);
        }
      }

      scheduleStroke(0.0, 128, 56, 0.55, 0.11);
      scheduleStroke(0.16, 98, 48, 0.28, 0.09);
    }

    function toggleAudio(forceOn) {
      const target = forceOn !== undefined ? !!forceOn : !state.audioEnabled;
      if (!target) {
        state.audioEnabled = false;
        return false;
      }
      const ctx = ensureAudioContext();
      if (!ctx) {
        state.audioEnabled = false;
        return false;
      }
      if (ctx.state === 'suspended') {
        ctx.resume().catch(function () {});
      }
      state.audioEnabled = true;
      lastBeatIdx = -1;
      return true;
    }

    function triggerKick() {
      state.kickTime = (now() - time0) / 1000;
      ensureLoop();
    }

    function evictIfNeeded() {
      while (cache.size > MAX_CACHE) {
        const firstKey = cache.keys().next().value;
        if (firstKey === state.week) break;
        const sc = cache.get(firstKey);
        cache.delete(firstKey);
        for (let i = 0; i < sc.parts.length; i += 1) disposeMesh(gl, sc.parts[i].mesh);
      }
    }

    function buildAndCache(week) {
      let scene = cache.get(week);
      if (!scene) {
        scene = buildSceneData(week, quality);
        for (let i = 0; i < scene.parts.length; i += 1) uploadMesh(gl, scene.parts[i].mesh);
        cache.set(week, scene);
        evictIfNeeded();
      }
      return scene;
    }

    function schedulePrefetch(week) {
      if (prefetchTimer) { clearTimeout(prefetchTimer); prefetchTimer = 0; }
      const next = week + 1;
      if (next > 42 || cache.has(next)) return;
      prefetchTimer = setTimeout(function () {
        prefetchTimer = 0;
        if (!state.active || state.building) return;
        if (now() - state.lastInteract < 1200) { schedulePrefetch(week); return; }
        try { buildAndCache(next); } catch (_e) { /* ignore prefetch failures */ }
      }, 900);
    }

    function setWeek(week) {
      const w = clamp(Math.round(Number(week) || 1), 1, 42);
      state.week = w;
      lastBeatIdx = -1;
      if (buildTimer) { clearTimeout(buildTimer); buildTimer = 0; }
      if (cache.has(w)) {
        state.scene = cache.get(w);
        if (opts.onBuildEnd) opts.onBuildEnd(w, true);
        schedulePrefetch(w);
        ensureLoop();
        return;
      }
      state.building = true;
      if (opts.onBuildStart) opts.onBuildStart(w);
      buildTimer = setTimeout(function () {
        buildTimer = 0;
        if (state.week !== w) { state.building = false; return; }
        try {
          state.scene = buildAndCache(w);
        } catch (err) {
          state.building = false;
          if (opts.onError) opts.onError(err);
          return;
        }
        state.building = false;
        if (opts.onBuildEnd) opts.onBuildEnd(w, false);
        schedulePrefetch(w);
        ensureLoop();
      }, 24);
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    function setUniform3(loc, v) { gl.uniform3f(loc, v[0], v[1], v[2]); }

    function drawBackgroundGlow(t, pulse, kickEnv) {
      gl.useProgram(bgProgram.prog);
      gl.disable(gl.DEPTH_TEST);
      gl.depthMask(false);
      gl.enable(gl.BLEND);
      gl.bindBuffer(gl.ARRAY_BUFFER, bgProgram.vbo);
      gl.enableVertexAttribArray(bgProgram.aQuad);
      gl.vertexAttribPointer(bgProgram.aQuad, 2, gl.FLOAT, false, 0, 0);
      gl.uniform1f(bgProgram.uTime, t);
      gl.uniform1f(bgProgram.uPulse, pulse);
      gl.uniform1f(bgProgram.uKickEnv, kickEnv);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      gl.disableVertexAttribArray(bgProgram.aQuad);
      gl.enable(gl.DEPTH_TEST);
      gl.depthMask(true);
    }

    function drawAmnioticParticles(viewProj, scene, t) {
      if (!state.showSac) return;
      gl.useProgram(particleProgram.prog);
      gl.enable(gl.BLEND);
      gl.depthMask(false);
      gl.bindBuffer(gl.ARRAY_BUFFER, particleProgram.vbo);
      gl.enableVertexAttribArray(particleProgram.aSeed);
      gl.vertexAttribPointer(particleProgram.aSeed, 3, gl.FLOAT, false, 16, 0);
      gl.enableVertexAttribArray(particleProgram.aSize);
      gl.vertexAttribPointer(particleProgram.aSize, 1, gl.FLOAT, false, 16, 12);
      gl.uniformMatrix4fv(particleProgram.uViewProj, false, viewProj);
      setUniform3(particleProgram.uCenter, scene.center);
      gl.uniform1f(particleProgram.uRadius, scene.radius);
      gl.uniform1f(particleProgram.uTime, t);
      gl.uniform1f(particleProgram.uDpr, Math.min(window.devicePixelRatio || 1, 2));
      gl.drawArrays(gl.POINTS, 0, particleProgram.count);
      gl.disableVertexAttribArray(particleProgram.aSeed);
      gl.disableVertexAttribArray(particleProgram.aSize);
      gl.depthMask(true);
    }

    function drawPart(p, viewProj, eye, pulse, t, kickEnv) {
      if (p.xrayOnly && !state.xray) return;
      const m = p.material;
      let alpha = m.alpha;
      let emissive = m.emissive;
      let model = p.model;
      let matType = m.matType || 0;
      if (state.xray) {
        if (p.group === 'skin') alpha = Math.min(alpha, 0.28);
        if (p.group === 'sac') alpha *= 0.5;
      }
      if (!state.showSac && p.group === 'sac') return;
      if (p.pulse && pulse > 0) {
        const s = 1 + 0.095 * pulse * state.pulseAmp;
        model = m4Mul(p.model, m4Scale([s, s, s]));
        emissive = [m.emissive[0] + 0.36 * pulse, m.emissive[1] + 0.04 * pulse, m.emissive[2] + 0.03 * pulse];
      }
      const gpu = p.mesh.gpu || uploadMesh(gl, p.mesh);
      gl.bindBuffer(gl.ARRAY_BUFFER, gpu.vbo);
      gl.enableVertexAttribArray(program.aPosition);
      gl.vertexAttribPointer(program.aPosition, 3, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, gpu.nbo);
      gl.enableVertexAttribArray(program.aNormal);
      gl.vertexAttribPointer(program.aNormal, 3, gl.FLOAT, false, 0, 0);
      if (program.aSurface >= 0 && gpu.sbo) {
        gl.bindBuffer(gl.ARRAY_BUFFER, gpu.sbo);
        gl.enableVertexAttribArray(program.aSurface);
        gl.vertexAttribPointer(program.aSurface, 2, gl.FLOAT, false, 0, 0);
      }
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gpu.ibo);

      gl.uniformMatrix4fv(program.loc.uModel, false, model);
      gl.uniformMatrix4fv(program.loc.uViewProj, false, viewProj);
      gl.uniformMatrix3fv(program.loc.uNormalMat, false, m3NormalFromM4(model));
      setUniform3(program.loc.uCamPos, eye);
      setUniform3(program.loc.uBase, m.base);
      setUniform3(program.loc.uSss, m.sss);
      setUniform3(program.loc.uRim, m.rim);
      setUniform3(program.loc.uEmissive, emissive);
      setUniform3(program.loc.uNoiseOffset, p.noiseOffset);
      gl.uniform1f(program.loc.uSssAmt, m.sssAmt);
      gl.uniform1f(program.loc.uAlpha, alpha);
      gl.uniform1f(program.loc.uRough, m.rough);
      gl.uniform1f(program.loc.uSpec, m.spec);
      gl.uniform1f(program.loc.uVein, m.vein);
      gl.uniform1f(program.loc.uCell, m.cell);
      gl.uniform1f(program.loc.uFresnel, m.fresnel);
      gl.uniform1f(program.loc.uNoiseScale, m.noiseScale);
      gl.uniform1f(program.loc.uMatType, matType);
      gl.uniform1f(program.loc.uPulse, pulse * state.pulseAmp);
      gl.uniform1f(program.loc.uTime, t);
      gl.uniform1f(program.loc.uAnimAmp, state.pulseAmp);
      gl.uniform1f(program.loc.uKickEnv, kickEnv);
      gl.uniform1f(program.loc.uAnimateSkin, p.animateSkin ? 1.0 : 0.0);

      if (p.cull === 'none') {
        gl.disable(gl.CULL_FACE);
        gl.drawElements(gl.TRIANGLES, gpu.count, gl.UNSIGNED_INT, 0);
      } else if (p.cull === 'two') {
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.FRONT);
        gl.drawElements(gl.TRIANGLES, gpu.count, gl.UNSIGNED_INT, 0);
        gl.cullFace(gl.BACK);
        gl.drawElements(gl.TRIANGLES, gpu.count, gl.UNSIGNED_INT, 0);
      } else {
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.BACK);
        gl.drawElements(gl.TRIANGLES, gpu.count, gl.UNSIGNED_INT, 0);
      }
    }

    function isTransparent(p) {
      if (state.xray && (p.group === 'skin' || p.group === 'sac')) return true;
      return p.transparent;
    }

    function render(tNow) {
      resize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      const scene = state.scene;
      if (!scene) return;

      const dt = lastFrame ? Math.min(0.1, (tNow - lastFrame) / 1000) : 0;
      lastFrame = tNow;
      const t = (tNow - time0) / 1000;
      if (state.autoRotate && tNow - state.lastInteract > 2500) state.yaw += dt * 0.26;

      const kickAge = t - state.kickTime;
      const kickEnv = (kickAge >= 0 && kickAge < 1.8) ? Math.sin(Math.min(1, kickAge * 4.5) * PI * 0.5) * Math.exp(-kickAge * 2.2) : 0;

      const pulse = heartbeatPulse(t, scene.bpm);
      if (state.audioEnabled && scene.bpm > 0) {
        const beatIdx = Math.floor(t * scene.bpm / 60);
        if (beatIdx !== lastBeatIdx) {
          lastBeatIdx = beatIdx;
          playDopplerPulse(scene.bpm);
        }
      }

      drawBackgroundGlow(t, pulse, kickEnv);

      const aspect = canvas.width / canvas.height;
      const fov = 0.62;
      const proj = m4Perspective(fov, aspect, 0.05, 120);
      const dist = (scene.radius / Math.sin(fov / 2)) * 1.02 / state.zoom;
      const bob = state.pulseAmp ? Math.sin(t * 0.85) * 0.014 * scene.radius : 0;
      const center = [scene.center[0], scene.center[1] + bob, scene.center[2]];
      const eye = [
        center[0] + dist * Math.cos(state.pitch) * Math.sin(state.yaw),
        center[1] + dist * Math.sin(state.pitch),
        center[2] + dist * Math.cos(state.pitch) * Math.cos(state.yaw)
      ];
      const view = m4LookAt(eye, center, [0, 1, 0]);
      const viewProj = m4Mul(proj, view);

      gl.useProgram(program.prog);
      gl.disable(gl.BLEND);
      gl.depthMask(true);
      const transparent = [];
      for (let i = 0; i < scene.parts.length; i += 1) {
        const p = scene.parts[i];
        if (p.xrayOnly && !state.xray) continue;
        if (isTransparent(p)) { transparent.push(p); continue; }
        drawPart(p, viewProj, eye, pulse, t, kickEnv);
      }
      if (transparent.length) {
        for (let i = 0; i < transparent.length; i += 1) {
          const c = transparent[i].center;
          transparent[i].depthKey = (c[0] - eye[0]) * (c[0] - eye[0]) + (c[1] - eye[1]) * (c[1] - eye[1]) + (c[2] - eye[2]) * (c[2] - eye[2]);
        }
        transparent.sort(function (a, b) { return (a.order - b.order) || (b.depthKey - a.depthKey); });
        gl.enable(gl.BLEND);
        for (let i = 0; i < transparent.length; i += 1) {
          const tp = transparent[i];
          if (tp.group === 'skin' || tp.group === 'cord') {
            gl.colorMask(false, false, false, false);
            gl.depthMask(true);
            drawPart(tp, viewProj, eye, pulse, t, kickEnv);
            gl.colorMask(true, true, true, true);
          }
          gl.depthMask(false);
          drawPart(tp, viewProj, eye, pulse, t, kickEnv);
        }
        gl.depthMask(true);
      }

      drawAmnioticParticles(viewProj, scene, t);
      gl.disable(gl.BLEND);
    }

    function frame(tNow) {
      rafId = 0;
      if (!state.active) return;
      try { render(tNow); } catch (err) { if (opts.onError) opts.onError(err); return; }
      rafId = requestAnimationFrame(frame);
    }
    function ensureLoop() {
      if (!rafId && state.active) rafId = requestAnimationFrame(frame);
    }

    /* ---------- Interaction ---------- */
    const pointers = new Map();
    let pinchDist = 0;
    let downPos = null;
    function markInteract() { state.lastInteract = now(); }

    canvas.addEventListener('pointerdown', function (e) {
      canvas.setPointerCapture(e.pointerId);
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      downPos = { x: e.clientX, y: e.clientY, t: now() };
      if (pointers.size === 2) {
        const arr = Array.from(pointers.values());
        pinchDist = Math.hypot(arr[0].x - arr[1].x, arr[0].y - arr[1].y);
      }
      markInteract();
      canvas.focus({ preventScroll: true });
    });
    canvas.addEventListener('pointermove', function (e) {
      if (!pointers.has(e.pointerId)) return;
      const prev = pointers.get(e.pointerId);
      const dx = e.clientX - prev.x, dy = e.clientY - prev.y;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size === 1) {
        state.yaw += dx * 0.0085;
        state.pitch = clamp(state.pitch + dy * 0.0075, -1.35, 1.35);
      } else if (pointers.size === 2) {
        const arr = Array.from(pointers.values());
        const d = Math.hypot(arr[0].x - arr[1].x, arr[0].y - arr[1].y);
        if (pinchDist > 0) state.zoom = clamp(state.zoom * (d / pinchDist), 0.45, 3.4);
        pinchDist = d;
      }
      markInteract();
    });
    function endPointer(e) {
      if (downPos && pointers.size === 1) {
        const distMoved = Math.hypot(e.clientX - downPos.x, e.clientY - downPos.y);
        if (distMoved < 6 && (now() - downPos.t) < 320 && state.week >= 5) {
          triggerKick();
        }
      }
      downPos = null;
      pointers.delete(e.pointerId);
      if (pointers.size < 2) pinchDist = 0;
      markInteract();
    }
    canvas.addEventListener('pointerup', endPointer);
    canvas.addEventListener('pointercancel', endPointer);
    canvas.addEventListener('lostpointercapture', endPointer);
    canvas.addEventListener('wheel', function (e) {
      e.preventDefault();
      state.zoom = clamp(state.zoom * Math.exp(-e.deltaY * 0.0012), 0.45, 3.4);
      markInteract();
    }, { passive: false });
    canvas.addEventListener('dblclick', function () { resetView(); });
    canvas.addEventListener('keydown', function (e) {
      const step = 0.12;
      let handled = true;
      if (e.key === 'ArrowLeft') state.yaw -= step;
      else if (e.key === 'ArrowRight') state.yaw += step;
      else if (e.key === 'ArrowUp') state.pitch = clamp(state.pitch + step * 0.7, -1.35, 1.35);
      else if (e.key === 'ArrowDown') state.pitch = clamp(state.pitch - step * 0.7, -1.35, 1.35);
      else if (e.key === '+' || e.key === '=') state.zoom = clamp(state.zoom * 1.12, 0.45, 3.4);
      else if (e.key === '-' || e.key === '_') state.zoom = clamp(state.zoom / 1.12, 0.45, 3.4);
      else if (e.key === 'k' || e.key === 'K' || e.key === ' ') triggerKick();
      else if (e.key === 'r' || e.key === 'R') resetView();
      else handled = false;
      if (handled) { e.preventDefault(); markInteract(); }
    });

    function resetView() { state.yaw = 0.36; state.pitch = -0.04; state.zoom = 1; markInteract(); }

    let resizeObserver = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(function () { resize(); });
      resizeObserver.observe(canvas);
    }
    function onVisibility() {
      if (document.hidden) { state.active = false; }
      else if (viewer.wanted) { state.active = true; ensureLoop(); }
    }
    document.addEventListener('visibilitychange', onVisibility);

    const viewer = {
      supported: true,
      wanted: true,
      canvas: canvas,
      setWeek: setWeek,
      resetView: resetView,
      triggerKick: triggerKick,
      toggleAudio: toggleAudio,
      setActive: function (on) {
        viewer.wanted = !!on;
        state.active = !!on && !document.hidden;
        if (state.active) { lastFrame = 0; ensureLoop(); }
      },
      setOptions: function (o) {
        if (!o) return;
        if (o.autoRotate !== undefined) state.autoRotate = !!o.autoRotate;
        if (o.xray !== undefined) state.xray = !!o.xray;
        if (o.showSac !== undefined) state.showSac = !!o.showSac;
        if (o.audioEnabled !== undefined) toggleAudio(!!o.audioEnabled);
        if (typeof o.yaw === 'number' && Number.isFinite(o.yaw)) state.yaw = o.yaw;
        if (typeof o.pitch === 'number' && Number.isFinite(o.pitch)) state.pitch = clamp(o.pitch, -1.35, 1.35);
        if (typeof o.zoom === 'number' && Number.isFinite(o.zoom)) state.zoom = clamp(o.zoom, 0.45, 3.4);
        markInteract();
      },
      getState: function () {
        const bpm = state.scene ? Math.round(state.scene.bpm || 0) : 0;
        return {
          autoRotate: state.autoRotate,
          xray: state.xray,
          showSac: state.showSac,
          audioEnabled: state.audioEnabled,
          bpm: bpm,
          week: state.week,
          building: state.building
        };
      },
      destroy: function () {
        state.active = false;
        state.audioEnabled = false;
        if (audioCtx && audioCtx.close) { try { audioCtx.close(); } catch (_e) {} }
        if (rafId) cancelAnimationFrame(rafId);
        if (buildTimer) clearTimeout(buildTimer);
        if (prefetchTimer) clearTimeout(prefetchTimer);
        if (resizeObserver) resizeObserver.disconnect();
        document.removeEventListener('visibilitychange', onVisibility);
        cache.forEach(function (sc) { for (let i = 0; i < sc.parts.length; i += 1) disposeMesh(gl, sc.parts[i].mesh); });
        cache.clear();
        canvas.remove();
      }
    };
    ensureLoop();
    return viewer;
  }

  globalScope.PrenatalAtlas3D = {
    createViewer: createViewer,
    buildSceneData: buildSceneData,
    fetalHeartRate: fetalHeartRate,
    _internals: { rigToMesh: rigToMesh, createRig: createRig, rigSphere: rigSphere, rigCone: rigCone, rigEllipsoid: rigEllipsoid, buildUvSphere: buildUvSphere, buildTube: buildTube }
  };
})(typeof window !== 'undefined' ? window : globalThis);
