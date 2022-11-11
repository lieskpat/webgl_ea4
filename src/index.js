"use strict";

import { initContext } from "./modules/initContext.js";
import { initWebGl, initBuffer } from "./modules/initWebGl.js";

const vertices = new Float32Array([
0, 0, 0, 
1, 0, 0, 
1, 1, 0, 
0, 1, 0, 
0, 0, 0, 
1, 1, 0,
//--------
0, 0, 0,
-1, 0, 0,
-1, 1, 0,
0, 1, 0,
0, 0, 0,
-1, 1, 0,
//--------
0, 0, 0,
1, 0, 0,
1, -1,  0,
0, -1, 0,
0, 0, 0,
1, -1, 0,
//--------
0, 0, 0,
-1, 0, 0,
-1, -1, 0,
0, -1, 0,
0, 0, 0,
-1, -1, 0
]);
const colors = new Float32Array([
1, 0, 0, 1, 
0, 1, 0, 1, 
0, 0, 1, 1,
1, 0, 1, 1,
0, 1, 1, 1, 
1, 1, 0, 1,
//-----------------
1, 0, 0, 1, 
0, 1, 0, 1, 
0, 0, 1, 1,
1, 0, 1, 1,
0, 1, 1, 1, 
1, 1, 0, 1,
//-----------------
1, 0, 0, 1, 
0, 1, 0, 1, 
0, 0, 1, 1,
1, 0, 1, 1,
0, 1, 1, 1, 
1, 1, 0, 1,
//-----------------
1, 0, 0, 1, 
0, 1, 0, 1, 
0, 0, 1, 1,
1, 0, 1, 1,
0, 1, 1, 1, 
1, 1, 0, 1
]);
const indices = new Uint16Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]);

const gl = initContext("gl_context");
const initObject = initWebGl(gl);
gl.useProgram(initObject.program);

initBuffer(gl, vertices, gl.ARRAY_BUFFER, initObject.program, "pos", 3);
initBuffer(gl, colors, gl.ARRAY_BUFFER, initObject.program, "col", 4);

const ibo = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
ibo.numberOfElements = indices.length;

gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawElements(gl.TRIANGLES, ibo.numberOfElements, gl.UNSIGNED_SHORT, 0);
