import useAppLoader from "../../hooks/useAppLoader";
import {
  RenderTexture,
  Sprite as OriginSprite,
  Graphics,
  InteractionEvent,
} from "pixi.js";
import { useApp, Sprite, Text } from "@inlet/react-pixi";
import { useState, useEffect, useRef } from "react";

const prizes = [
  "Car",
  "Vacation",
  "TV",
  "Laptop",
  "Smartphone",
  "Gift Card",
  "Nothing",
];

const Playground = () => {
  const app = useApp();
  const { width, height } = app.screen;
  const { grunge } = app.loader.resources;
  const isLoaded = useAppLoader();

  const [prize, setPrize] = useState("");
  const [winMessage, setWinMessage] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const clearedPixelsRef = useRef(0);
  const totalPixels = width * height;

  useEffect(() => {
    const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
    setPrize(randomPrize);
  }, []);

  const brush = new Graphics();
  brush.beginFill(0xffffff);
  brush.drawCircle(0, 0, 50);
  brush.endFill();

  const renderTexture = RenderTexture.create({
    width,
    height,
  });

  const renderTextureSprite = new OriginSprite(renderTexture);

  let dragging = false;

  const checkClearedArea = () => {
    const pixels = app.renderer.extract.pixels(renderTexture);
    let clearedPixels = 0;

    for (let i = 0; i < pixels.length; i += 4) {
      if (pixels[i + 3] !== 0) clearedPixels++;
    }

    clearedPixelsRef.current = clearedPixels;
    const clearedPercentage = (clearedPixelsRef.current / totalPixels) * 100;

    if (clearedPercentage > 80) {
      setWinMessage(true);
      setIsComplete(true);
    }
  };

  const pointerMove = (e: InteractionEvent) => {
    if (dragging && !isComplete) {
      brush.position.copyFrom(e.data.global);
      app.renderer.render(brush, renderTexture, false);
      checkClearedArea();
    }
  };

  const pointerDown = (e: InteractionEvent) => {
    if (!isComplete) {
      dragging = true;
      pointerMove(e);
    }
  };

  const pointerUp = () => {
    dragging = false;
  };

  if (!isLoaded) return null;

  return (
    <>
      {!isComplete && (
        <Sprite width={width} height={height} texture={grunge.texture} />
      )}

      {winMessage && (
        <Text
          text="You won!"
          anchor={0.5}
          x={width / 2}
          y={height - 130}
          style={{
            fontFamily: "Arial",
            fontSize: 36,
            fill: ["#ff0000"],
            fontWeight: "bold",
            dropShadow: true,
            dropShadowColor: "#000000",
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
          }}
        />
      )}

      <Text
        text={prize}
        anchor={0.5}
        x={width / 2}
        y={height / 2 + 20}
        style={{
          fontFamily: "Arial",
          fontSize: 48,
          fill: ["#ffffff"],
          fontWeight: "bold",
          dropShadow: true,
          dropShadowColor: "#000000",
          dropShadowBlur: 4,
          dropShadowAngle: Math.PI / 6,
          dropShadowDistance: 6,
        }}
        mask={!isComplete ? renderTextureSprite : null}
      />

      {!isComplete && (
        <Sprite
          interactive
          width={width}
          height={height}
          texture={renderTextureSprite.texture}
          mask={renderTextureSprite}
          pointermove={pointerMove}
          pointerdown={pointerDown}
          pointerup={pointerUp}
        />
      )}
    </>
  );
};

export default Playground;
