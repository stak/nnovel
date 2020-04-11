varying vec2 vFilterCoord;
varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uTrans;

uniform float progress;
uniform float size;

float rand(vec2 co)
{
  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main(void)
{
  float r = rand(vec2(0, $0));
  float m = smoothstep(0.0, -size,
    $1 * (1.0 - size) + size * r - (progress * (1.0 + size)));
  
  gl_FragColor = mix(
    texture2D(uSampler, vTextureCoord),
    texture2D(uTrans, vFilterCoord),
    m
  );
}
