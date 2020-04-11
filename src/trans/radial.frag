varying vec2 vFilterCoord;
varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uTrans;

uniform float progress;
uniform float smoothness;
uniform mat3 rotate;
uniform bool reverse;
const float PI = 3.141592653589;

void main() {
  vec3 rp = rotate * (vec3(vFilterCoord, 1.0) * 2.0 - 1.0);

  gl_FragColor = mix(
    texture2D(uTrans, vFilterCoord),
    texture2D(uSampler, vTextureCoord),
    reverse ?
      (1.0 - smoothstep(0.0, smoothness, atan(rp.y, rp.x) + (progress - 0.5) * PI * 2.5)):
      smoothstep(0.0, smoothness, atan(rp.y, rp.x) - (progress - 0.5) * PI * 2.5)
  );
}