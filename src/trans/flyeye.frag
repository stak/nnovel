varying vec2 vFilterCoord;
varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uTrans;

uniform float progress;

uniform float size;
uniform float zoom;
uniform float colorSeparation;

void main(void)
{
    float inv = 1.0 - progress;
    vec2 disp = size * vec2(cos(zoom * vFilterCoord.x), sin(zoom * vFilterCoord.y));
    
    vec4 texTo = texture2D(uTrans, vFilterCoord + inv * disp);
    vec4 texFrom = vec4(
    texture2D(uSampler, vTextureCoord + progress * disp * (1.0 - colorSeparation)).r,
    texture2D(uSampler, vTextureCoord + progress * disp).g,
    texture2D(uSampler, vTextureCoord + progress * disp * (1.0 + colorSeparation)).b,
    1.0);

    gl_FragColor = texTo * progress + texFrom * inv;
}