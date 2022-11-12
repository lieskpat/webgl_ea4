"use strict";

import { initContext } from "./modules/initContext.js";
import { initWebGl, initBuffer } from "./modules/initWebGl.js";

function createVertexData(callback) {
    const vertexDataObject = { vertices: [], indices: [] };
    callback(vertexDataObject);
    return vertexDataObject;
}

//const colors = new Float32Array([]);

const spinnenNetz = function (vertexDataObject) {
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
    vertexDataObject.vertices = vertices;
    vertexDataObject.indices = indices;
};

const vertexDataSpider = createVertexData(spinnenNetz);
const vertexDataKonus = createVertexData(function (vertexDataObject) {});

const gl = initContext("gl_context");
const gl2 = initContext("gl_context_02");
const gl3 = initContext("gl_context_03");
const gl4 = initContext("gl_context_04");
const initObject = initWebGl(gl);
const initObject2 = initWebGl(gl2);
gl.useProgram(initObject.program);
gl2.useProgram(initObject2.program);

initBuffer(
    gl,
    vertexDataSpider.vertices,
    gl.ARRAY_BUFFER,
    initObject.program,
    "pos",
    3
);
initBuffer(
    gl2,
    vertexDataSpider.vertices,
    gl2.ARRAY_BUFFER,
    initObject2.program,
    "pos",
    3
);
//initBuffer(gl, colors, gl.ARRAY_BUFFER, initObject.program, "col", 4);

const ibo = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    vertexDataSpider.indices,
    gl.STATIC_DRAW
);
ibo.numberOfElements = vertexDataSpider.indices.length;

const ibo2 = gl2.createBuffer();
gl2.bindBuffer(gl2.ELEMENT_ARRAY_BUFFER, ibo2);
gl2.bufferData(
    gl2.ELEMENT_ARRAY_BUFFER,
    vertexDataSpider.indices,
    gl2.STATIC_DRAW
);
ibo2.numberOfElements = vertexDataSpider.indices.length;

gl.clearColor(0.95, 0.95, 0.95, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawElements(gl.LINE_STRIP, ibo.numberOfElements, gl.UNSIGNED_SHORT, 0);

gl2.clearColor(0.95, 0.95, 0.95, 1);
gl2.clear(gl2.COLOR_BUFFER_BIT);
gl2.drawElements(gl2.LINE_STRIP, ibo2.numberOfElements, gl2.UNSIGNED_SHORT, 0);

gl3.clearColor(0.95, 0.95, 0.95, 1);
gl3.clear(gl.COLOR_BUFFER_BIT);

gl4.clearColor(0.95, 0.95, 0.95, 1);
gl4.clear(gl.COLOR_BUFFER_BIT);
