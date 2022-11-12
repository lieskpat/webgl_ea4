(function () {
    'use strict';

    function initContext(id) {
        const canvas = document.getElementById(id);
        const gl = canvas.getContext("webgl");
        if (!gl) {
            console.log("error: no gl context");
        }
        return gl;
    }

    // create a shader
    function createShader(gl, type, source) {
        //createShader erzeugt Shader Objekt
        //in das Shader-Programm geladen wird
        const shader = gl.createShader(type);
        //lädt Programmcode in Shader-Objekt
        gl.shaderSource(shader, source);
        //übersetzt Programm im Shader
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.log("error: compiling shader");
        }
        return shader;
    }

    var vertexGlsl = `
    //zweidimensionaler Vektor
    attribute vec3 pos;
    attribute vec4 col;
    varying vec4 color;
    void main() {
        //berechnet neue Position der Übergebenen Vertices
        //gl_position ist vierdimensionaler Vektor in homogenen Koordinaten
        //der form vec4(x, y, z, w)
        color = col;
        gl_Position = vec4(pos, 1);
    }
`;

    //Fragment Shader dienen unter anderem der Einfärbung
    var fragmentGlsl = `
    precision mediump float;
    varying vec4 color;
    void main(){
        //vierdimensionaler Vektor vec4(1, 1, 1, 1, 1)
        //RGB + Alpha Kanal
        gl_FragColor = color;
    }
`;

    function createProgram(gl, vertexShader, fragmentShader) {
        const prog = gl.createProgram();
        //fügt Shader-Objekt zu einem GPU-Programm hinzu
        gl.attachShader(prog, vertexShader);
        gl.attachShader(prog, fragmentShader);
        //verbindet die Shader und erzeugt ausführbares GPU Programm
        gl.linkProgram(prog);
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
            console.log("Error: linking shader program");
        }
        return prog;
    }

    function initBuffer(
        gl,
        arrayOfBufferData,
        bufferType,
        prog,
        objectOfShaderVars,
        numberOfComponents
    ) {
        //const n = vertices.length / 2;
        //create a buffer object
        const buffer = gl.createBuffer();
        //bind the buffer object to target (for example ARRAY_BUFFER)
        gl.bindBuffer(bufferType, buffer);
        //write data into the buffer object
        gl.bufferData(bufferType, arrayOfBufferData, gl.STATIC_DRAW);
        const positionAttributeLocation = gl.getAttribLocation(
            prog,
            objectOfShaderVars
        );
        gl.getUniformLocation(prog, objectOfShaderVars);
        gl.vertexAttribPointer(
            positionAttributeLocation,
            numberOfComponents,
            gl.FLOAT,
            false,
            0,
            0
        );
        gl.enableVertexAttribArray(positionAttributeLocation);
        //return n;
    }

    function initWebGl(gl) {
        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexGlsl);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentGlsl);
        const prog = createProgram(gl, vertexShader, fragmentShader);
        return {
            shader: {
                vertex_shader: vertexShader,
                fragment_shader: fragmentShader,
            },
            program: prog,
        };
    }

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

})();
