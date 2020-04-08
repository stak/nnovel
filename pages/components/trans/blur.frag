varying vec2 vFilterCoord;
varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uTrans;

uniform float progress;
uniform float intensity;
const int passes = $0;

void main(void)
{
    vec4 c1 = vec4(0.0);
    vec4 c2 = vec4(0.0);

    float blur = intensity * (0.5 - distance(progress, 0.5));
    for (int xi = 0; xi < passes; xi++)
    {
        float x = float(xi) / float(passes) - 0.5;
        for (int yi = 0; yi < passes; yi++)
        {
            float y = float(yi) / float(passes) - 0.5;
            vec2 v = vec2(x, y);
            c1 += texture2D(uSampler, vTextureCoord + blur * v);
            c2 += texture2D(uTrans, vFilterCoord + blur * v);
        }
    }
    c1 /= float(passes * passes);
    c2 /= float(passes * passes);

    gl_FragColor = mix(c1, c2, progress);
}