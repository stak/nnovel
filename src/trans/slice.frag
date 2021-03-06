varying vec2 vFilterCoord;
varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uTrans;

uniform float progress;

uniform float count;
uniform float smoothness;

void main(void)
{
    float pr = smoothstep(-smoothness, 0.0, $0 - progress * (1.0 + smoothness));
    float s = step(pr, fract(count * $0));

    vec4 c1 = texture2D(uSampler, vTextureCoord);
    vec4 c2 = texture2D(uTrans, vFilterCoord);

    gl_FragColor = mix(c1, c2, s);
}