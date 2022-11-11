export default `
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
