//Fragment Shader dienen unter anderem der Einfärbung
export default `
    precision mediump float;
    varying vec4 color;
    void main(){
        //vierdimensionaler Vektor vec4(1, 1, 1, 1, 1)
        //RGB + Alpha Kanal
        gl_FragColor = color;
    }
`;
