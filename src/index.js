"use strict";

import { initContext } from "./modules/initContext.js";
import { initWebGl, initBuffer } from "./modules/initWebGl.js";

function createVertexData() {
    const m = 5;
    const n = 32;
    const vertices = new Float32Array(3 * (n + 1) * (m + 1));
    const indices = new Uint16Array(2 * 2 * n * m);

    const dt = (2 * Math.PI) / n;
    const dr = 1 / m;
    let iIndex = 0;

    for (let i = 0, t = 0; i <= n; i++, t += dt) {
        for (let j = 0, r = 0; j <= m; j++, r += dr) {
            let iVertex = i * (m + 1) + j;
            let x = r * Math.cos(t);
            let y = r * Math.sin(t);
            let z = 0;
            vertices[iVertex * 3] = x;
            vertices[iVertex * 3 + 1] = y;
            vertices[iVertex * 3 + 2] = z;

            if (j > 0 && i > 0) {
                indices[iIndex++] = iVertex - 1;
                indices[iIndex++] = iVertex;
            }
            if (j > 0 && i > 0) {
                indices[iIndex++] = iVertex - (m + 1);
                indices[iIndex++] = iVertex;
            }
        }
    }
    return {
        vertices: vertices,
        indices: indices,
    };
}
//const colors = new Float32Array([]);

const vertexData = createVertexData();
console.log(vertexData);

const gl = initContext("gl_context");
const initObject = initWebGl(gl);
gl.useProgram(initObject.program);

initBuffer(
    gl,
    vertexData.vertices,
    gl.ARRAY_BUFFER,
    initObject.program,
    "pos",
    3
);
//initBuffer(gl, colors, gl.ARRAY_BUFFER, initObject.program, "col", 4);

const ibo = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, vertexData.indices, gl.STATIC_DRAW);
ibo.numberOfElements = vertexData.indices.length;

gl.clearColor(0.95, 0.95, 0.95, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawElements(gl.LINE_STRIP, ibo.numberOfElements, gl.UNSIGNED_SHORT, 0);
