"use strict";

import { initContext } from "./modules/initContext.js";
import { initWebGl, initBuffer } from "./modules/initWebGl.js";

function createVertexData(callback) {
    const vertexDataObject = {
        vertices: [],
        indices: [],
        indicesTriangles: [],
    };
    callback(vertexDataObject);
    return vertexDataObject;
}

//const colors = new Float32Array([]);

const pillow = function (vertexDataObject) {
    const m = 7;
    const n = 32;
    const vertices = new Float32Array(3 * (n + 1) * (m + 1));
    const indices = new Uint16Array(2 * 2 * n * m);

    const umin = 0;
    const umax = Math.PI;
    const vmin = -1 * Math.PI;
    const vmax = Math.PI;
    const a = 0.5;
    const du = (umin + umax) / n;
    const dv = (vmin - vmax) / m;
    let iIndex = 0;

    for (let i = 0, u = 0; i <= n; i++, u += du) {
        for (let j = 0, v = 0; j <= m; j++, v += dv) {
            let iVertex = i * (m + 1) + j;
            let x = Math.cos(u);
            let z = Math.cos(v);
            let y = a * Math.sin(u) * Math.sin(v);
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

const pillowColor = function (vertexDataObject) {
    const m = 7;
    const n = 32;
    const vertices = new Float32Array(3 * (n + 1) * (m + 1));
    const indices = new Uint16Array(2 * 2 * n * m);
    const indicesTriangles = new Uint16Array(3 * 2 * n * m);

    const umin = 0;
    const umax = Math.PI;
    const vmin = -1 * Math.PI;
    const vmax = Math.PI;
    const a = 0.5;
    const du = (umin + umax) / n;
    const dv = (vmin - vmax) / m;
    let iIndex = 0;
    let iTriangles = 0;

    for (let i = 0, u = 0; i <= n; i++, u += du) {
        for (let j = 0, v = 0; j <= m; j++, v += dv) {
            let iVertex = i * (m + 1) + j;
            let x = Math.cos(u);
            let z = Math.cos(v);
            let y = a * Math.sin(u) * Math.sin(v);
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
            if (j > 0 && i > 0) {
                indicesTriangles[iTriangles++] = iVertex;
                indicesTriangles[iTriangles++] = iVertex - 1;
                indicesTriangles[iTriangles++] = iVertex - (m + 1);

                indicesTriangles[iTriangles++] = iVertex - 1;
                indicesTriangles[iTriangles++] = iVertex - (m + 1) - 1;
                indicesTriangles[iTriangles++] = iVertex - (m + 1);
            }
        }
    }
    vertexDataObject.vertices = vertices;
    vertexDataObject.indices = indices;
    vertexDataObject.indicesTriangles = indicesTriangles;
};

const dinis = function (vertexDataObject) {
    const n = 32;
    const m = 7;
    const c = 0.17;
    const vertices = new Float32Array(3 * (n + 1) * (m + 1));
    const indices = new Uint16Array(2 * 2 * n * m);
    const indicesTriangles = new Uint16Array(3 * 2 * n * m);

    const du = (4 * Math.PI) / n;
    const dv = (2 - 0.01) / n;
    const a = 3;
    const b = 0.6;

    let iIndex = 0;
    let iTriangles = 0;

    for (let i = 0, u = 0; i <= n; i++, u += du) {
        for (let j = 0, v = 0.01; j <= m; j++, v += dv) {
            let iVertex = i * (m + 1) + j;
            let x = a * Math.cos(u) * Math.sin(v) * c;
            let z = a * Math.sin(u) * Math.sin(v) * c;
            let y =
                (a * (Math.cos(v) + Math.log(Math.tan(v * 0.5))) + b * u) * c;

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
            if (j > 0 && i > 0) {
                indicesTriangles[iTriangles++] = iVertex;
                indicesTriangles[iTriangles++] = iVertex - 1;
                indicesTriangles[iTriangles++] = iVertex - (m + 1);

                indicesTriangles[iTriangles++] = iVertex - 1;
                indicesTriangles[iTriangles++] = iVertex - (m + 1) - 1;
                indicesTriangles[iTriangles++] = iVertex - (m + 1);
            }
        }
    }
    vertexDataObject.vertices = vertices;
    vertexDataObject.indices = indices;
    vertexDataObject.indicesTriangles = indicesTriangles;
};

const vertexDataPillow = createVertexData(pillow);
const vertexDataDinis = createVertexData(dinis);
const vertexDataPillowColor = createVertexData(pillowColor);

const gl = initContext("gl_context");
const gl2 = initContext("gl_context_02");
const gl3 = initContext("gl_context_03");
const gl4 = initContext("gl_context_04");
const initObject = initWebGl(gl);
const initObject2 = initWebGl(gl2);
const initObject3 = initWebGl(gl3);
gl.useProgram(initObject.program);
gl2.useProgram(initObject2.program);
gl3.useProgram(initObject3.program);

initBuffer(
    gl,
    vertexDataPillow.vertices,
    gl.ARRAY_BUFFER,
    initObject.program,
    "pos",
    3
);
initBuffer(
    gl2,
    vertexDataDinis.vertices,
    gl2.ARRAY_BUFFER,
    initObject2.program,
    "pos",
    3
);
initBuffer(
    gl3,
    vertexDataPillowColor.vertices,
    gl3.ARRAY_BUFFER,
    initObject3.program,
    "pos",
    3
);
//initBuffer(gl, colors, gl.ARRAY_BUFFER, initObject.program, "col", 4);

const ibo = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    vertexDataPillow.indices,
    gl.STATIC_DRAW
);
ibo.numberOfElements = vertexDataPillow.indices.length;

const ibo2 = gl2.createBuffer();
gl2.bindBuffer(gl2.ELEMENT_ARRAY_BUFFER, ibo2);
gl2.bufferData(
    gl2.ELEMENT_ARRAY_BUFFER,
    vertexDataDinis.indices,
    gl2.STATIC_DRAW
);
ibo2.numberOfElements = vertexDataDinis.indices.length;
gl2.bindBuffer(gl2.ELEMENT_ARRAY_BUFFER, null);

const ibo2Color = gl2.createBuffer();
gl2.bindBuffer(gl2.ELEMENT_ARRAY_BUFFER, ibo2Color);
gl2.bufferData(
    gl2.ELEMENT_ARRAY_BUFFER,
    vertexDataDinis.indicesTriangles,
    gl2.STATIC_DRAW
);
ibo2Color.numberOfElements = vertexDataDinis.indicesTriangles.length;
gl2.bindBuffer(gl2.ELEMENT_ARRAY_BUFFER, null);

const ibo3 = gl3.createBuffer();
gl3.bindBuffer(gl3.ELEMENT_ARRAY_BUFFER, ibo3);
gl3.bufferData(
    gl3.ELEMENT_ARRAY_BUFFER,
    vertexDataPillowColor.indices,
    gl3.STATIC_DRAW
);
ibo3.numberOfElements = vertexDataPillowColor.indices.length;
gl3.bindBuffer(gl3.ELEMENT_ARRAY_BUFFER, null);

const ibo3Color = gl3.createBuffer();
gl3.bindBuffer(gl3.ELEMENT_ARRAY_BUFFER, ibo3Color);
gl3.bufferData(
    gl3.ELEMENT_ARRAY_BUFFER,
    vertexDataPillowColor.indicesTriangles,
    gl3.STATIC_DRAW
);
ibo3Color.numberOfElements = vertexDataPillowColor.indicesTriangles.length;
gl3.bindBuffer(gl3.ELEMENT_ARRAY_BUFFER, null);

gl.clearColor(0.95, 0.95, 0.95, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.frontFace(gl.CCW);
gl.enable(gl.CULL_FACE);
gl.cullFace(gl.BACK);
gl.drawElements(gl.LINE_STRIP, ibo.numberOfElements, gl.UNSIGNED_SHORT, 0);

gl2.clearColor(0.95, 0.95, 0.95, 1);
gl2.clear(gl2.COLOR_BUFFER_BIT);
gl2.frontFace(gl2.CCW);
gl2.enable(gl2.CULL_FACE);
gl2.cullFace(gl2.BACK);
const colAttribute2 = gl2.getAttribLocation(initObject2.program, "col");
gl2.vertexAttrib4f(colAttribute2, 0.5, 0.8, 0, 1);
gl2.bindBuffer(gl2.ELEMENT_ARRAY_BUFFER, ibo2Color);
gl2.drawElements(
    gl2.TRIANGLES,
    ibo2Color.numberOfElements,
    gl2.UNSIGNED_SHORT,
    0
);
gl2.vertexAttrib4f(colAttribute2, 0, 0, 0, 1);
gl2.bindBuffer(gl2.ELEMENT_ARRAY_BUFFER, ibo2);
gl2.drawElements(gl2.LINES, ibo2.numberOfElements, gl2.UNSIGNED_SHORT, 0);

gl3.clearColor(0.95, 0.95, 0.95, 1);
gl3.clear(gl3.COLOR_BUFFER_BIT);
gl3.frontFace(gl3.CCW);
gl3.enable(gl3.CULL_FACE);
gl3.cullFace(gl3.BACK);

const colAttribute = gl3.getAttribLocation(initObject3.program, "col");
gl3.vertexAttrib4f(colAttribute, 0.5, 0.2, 0, 1);
gl3.bindBuffer(gl3.ELEMENT_ARRAY_BUFFER, ibo3Color);
gl3.drawElements(
    gl3.TRIANGLES,
    ibo3Color.numberOfElements,
    gl3.UNSIGNED_SHORT,
    0
);
gl3.vertexAttrib4f(colAttribute, 1.0, 1.0, 1.0, 1);
gl3.bindBuffer(gl3.ELEMENT_ARRAY_BUFFER, ibo3);
gl3.drawElements(gl3.LINES, ibo3.numberOfElements, gl3.UNSIGNED_SHORT, 0);

gl4.clearColor(0.95, 0.95, 0.95, 1);
gl4.clear(gl4.COLOR_BUFFER_BIT);
gl4.frontFace(gl4.CCW);
gl4.enable(gl4.CULL_FACE);
gl4.cullFace(gl4.BACK);
gl4.drawElements(gl4.LINES, ibo2.numberOfElements, gl2.UNSIGNED_SHORT, 0);
