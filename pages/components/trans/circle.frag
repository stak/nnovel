varying vec2 vFilterCoord;
varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uTrans;

uniform float progress;

uniform float smoothness;
uniform bool opening;
const vec2 center = vec2($0, $1);
const float SQRT_2 = 1.414213562373;

void main() {
  float x = opening ? progress : 1.0 - progress;
  float m = smoothstep(-smoothness, 0.0, SQRT_2 * distance(center, vFilterCoord) - x * (1.0 + smoothness));
  gl_FragColor = mix(
    texture2D(uSampler, vTextureCoord),
    texture2D(uTrans, vFilterCoord),
    opening ? 1.0 - m : m);
}
