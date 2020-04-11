varying vec2 vFilterCoord;
varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uTrans;
uniform sampler2D uRule;

uniform float vague;
uniform float progress;

void main(void)
{
    vec4 to = texture2D(uSampler, vTextureCoord);
    vec4 from = texture2D(uTrans, vFilterCoord);
    vec4 rule = texture2D(uRule, vFilterCoord);

    gl_FragColor = mix(
        from,
        to,
        smoothstep(progress - vague, progress, $0 * (1.0 - vague)));
}