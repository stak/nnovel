varying vec2 vFilterCoord;
varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uTrans;

uniform float progress;

const vec2 center = vec2(0.5, 0.5);
const vec2 direction = $0;
uniform float smoothness; 

void main() {
  vec2 v = normalize(direction);
  v /= abs(v.x) + abs(v.y);
  float d = v.x * center.x + v.y * center.y;
  float m =
    (1.0 - step(progress, 0.0)) *
    (1.0 - smoothstep(-smoothness, 0.0,
      v.x * vFilterCoord.x +
      v.y * vFilterCoord.y -
      (d - 0.5 + progress * (1.0 + smoothness))));

  gl_FragColor = mix(
    texture2D(uSampler, vTextureCoord),
    texture2D(uTrans, vFilterCoord),
    m);
}
