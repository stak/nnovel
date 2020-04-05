import { Filter, TextureMatrix, Matrix } from 'pixi.js'

const vertex = `
attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;
uniform mat3 otherMatrix;

varying vec2 vFilterCoord;
varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = aTextureCoord;
    vFilterCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;
}
`
const fragment = `
varying vec2 vFilterCoord;
varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uTrans;

uniform float progress;

const float size = 0.04;
const float zoom = 10.0;
const float colorSeparation = 0.3;

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
`

export class FlyeyeTransition extends Filter {
  transSprite
  transMatrix

  constructor(sprite) {
    const transMatrix = new Matrix()

    super(vertex, fragment, {
      progress: {
        type: '1f',
        value: 0,
      },
    })

    sprite.renderable = false
    this.transSprite = sprite
    this.transMatrix = transMatrix
  }

  apply(filterManager, input, output, clearMode) {
    const transSprite = this.transSprite
    const tex = transSprite._texture

    if (!tex.valid) {
      return
    }
    if (!tex.uvMatrix) {
      // margin = 0.0, let it bleed a bit, shader code becomes easier
      // assuming that atlas textures were made with 1-pixel padding
      tex.uvMatrix = new TextureMatrix(tex, 0.0)
    }
    tex.uvMatrix.update()

    this.uniforms.uTrans = tex
    // get _normalized sprite texture coords_ and convert them to _normalized atlas texture coords_ with `prepend`
    this.uniforms.otherMatrix = filterManager
      .calculateSpriteMatrix(this.transMatrix, transSprite)
      .prepend(tex.uvMatrix.mapCoord)

    filterManager.applyFilter(this, input, output, clearMode)
  }
}
