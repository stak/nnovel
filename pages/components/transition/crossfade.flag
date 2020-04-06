varying vec2 vFilterCoord;
varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uTrans;

uniform float progress;

void main(void)
{
    vec4 from = texture2D(uSampler, vTextureCoord);
    vec4 to = texture2D(uTrans, vFilterCoord);

    gl_FragColor = mix(from, to, progress);
}