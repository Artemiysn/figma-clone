"use client";
import { fabric } from "fabric";
import LeftSidebar from "@/components/LeftSidebar";
import Live from "@/components/Live";
import Navbar from "@/components/Navbar";
import RightSidebar from "@/components/RightSidebar";
import { useEffect, useRef } from "react";
import { handleCanvasMouseDown, handleResize, initializeFabric } from "@/lib/canvas";

export default function Page() {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  /**
   * fabricRef is a reference to the fabric canvas that we use to perform
   * operations on the canvas. It's a copy of the created canvas so we can use
   * it outside the canvas event listeners.
   */
  const fabricRef = useRef<fabric.Canvas | null>(null);

   /**
   * isDrawing is a boolean that tells us if the user is drawing on the canvas.
   * We use this to determine if the user is drawing or not
   * i.e., if the freeform drawing mode is on or not.
   */
   const isDrawing = useRef(false);

     /**
   * shapeRef is a reference to the shape that the user is currently drawing.
   * We use this to update the shape's properties when the user is
   * drawing/creating shape
   */
  const shapeRef = useRef<fabric.Object | null>(null);

    /**
   * selectedShapeRef is a reference to the shape that the user has selected.
   * For example, if the user has selected the rectangle shape, then this will
   * be set to "rectangle".
   *
   * We're using refs here because we want to access these variables inside the
   * event listeners. We don't want to lose the values of these variables when
   * the component re-renders. Refs help us with that.
   */
    const selectedShapeRef = useRef<string | null>('rectangle');

   /**
    * think about how to move this function
    */
   useEffect(() => {
    // initialize the fabric canvas
    const canvas = initializeFabric({
      canvasRef,
      fabricRef,
    });

    /**
     * listen to the mouse down event on the canvas which is fired when the
     * user clicks on the canvas
     *
     * Event inspector: http://fabricjs.com/events
     * Event list: http://fabricjs.com/docs/fabric.Canvas.html#fire
     */
    canvas.on("mouse:down", (options) => {
      handleCanvasMouseDown({
        options,
        canvas,
        selectedShapeRef,
        isDrawing,
        shapeRef,
      });
    });

    // /**
    //  * listen to the mouse move event on the canvas which is fired when the
    //  * user moves the mouse on the canvas
    //  *
    //  * Event inspector: http://fabricjs.com/events
    //  * Event list: http://fabricjs.com/docs/fabric.Canvas.html#fire
    //  */
    // canvas.on("mouse:move", (options) => {
    //   handleCanvaseMouseMove({
    //     options,
    //     canvas,
    //     isDrawing,
    //     selectedShapeRef,
    //     shapeRef,
    //     syncShapeInStorage,
    //   });
    // });

    // /**
    //  * listen to the mouse up event on the canvas which is fired when the
    //  * user releases the mouse on the canvas
    //  *
    //  * Event inspector: http://fabricjs.com/events
    //  * Event list: http://fabricjs.com/docs/fabric.Canvas.html#fire
    //  */
    // canvas.on("mouse:up", () => {
    //   handleCanvasMouseUp({
    //     canvas,
    //     isDrawing,
    //     shapeRef,
    //     activeObjectRef,
    //     selectedShapeRef,
    //     syncShapeInStorage,
    //     setActiveElement,
    //   });
    // });

    // /**
    //  * listen to the path created event on the canvas which is fired when
    //  * the user creates a path on the canvas using the freeform drawing
    //  * mode
    //  *
    //  * Event inspector: http://fabricjs.com/events
    //  * Event list: http://fabricjs.com/docs/fabric.Canvas.html#fire
    //  */
    // canvas.on("path:created", (options) => {
    //   handlePathCreated({
    //     options,
    //     syncShapeInStorage,
    //   });
    // });

    // /**
    //  * listen to the object modified event on the canvas which is fired
    //  * when the user modifies an object on the canvas. Basically, when the
    //  * user changes the width, height, color etc properties/attributes of
    //  * the object or moves the object on the canvas.
    //  *
    //  * Event inspector: http://fabricjs.com/events
    //  * Event list: http://fabricjs.com/docs/fabric.Canvas.html#fire
    //  */
    // canvas.on("object:modified", (options) => {
    //   handleCanvasObjectModified({
    //     options,
    //     syncShapeInStorage,
    //   });
    // });

    // /**
    //  * listen to the object moving event on the canvas which is fired
    //  * when the user moves an object on the canvas.
    //  *
    //  * Event inspector: http://fabricjs.com/events
    //  * Event list: http://fabricjs.com/docs/fabric.Canvas.html#fire
    //  */
    // canvas?.on("object:moving", (options) => {
    //   handleCanvasObjectMoving({
    //     options,
    //   });
    // });

    // /**
    //  * listen to the selection created event on the canvas which is fired
    //  * when the user selects an object on the canvas.
    //  *
    //  * Event inspector: http://fabricjs.com/events
    //  * Event list: http://fabricjs.com/docs/fabric.Canvas.html#fire
    //  */
    // canvas.on("selection:created", (options) => {
    //   handleCanvasSelectionCreated({
    //     options,
    //     isEditingRef,
    //     setElementAttributes,
    //   });
    // });

    // /**
    //  * listen to the scaling event on the canvas which is fired when the
    //  * user scales an object on the canvas.
    //  *
    //  * Event inspector: http://fabricjs.com/events
    //  * Event list: http://fabricjs.com/docs/fabric.Canvas.html#fire
    //  */
    // canvas.on("object:scaling", (options) => {
    //   handleCanvasObjectScaling({
    //     options,
    //     setElementAttributes,
    //   });
    // });

    // /**
    //  * listen to the mouse wheel event on the canvas which is fired when
    //  * the user scrolls the mouse wheel on the canvas.
    //  *
    //  * Event inspector: http://fabricjs.com/events
    //  * Event list: http://fabricjs.com/docs/fabric.Canvas.html#fire
    //  */
    // canvas.on("mouse:wheel", (options) => {
    //   handleCanvasZoom({
    //     options,
    //     canvas,
    //   });
    // });

    /**
     * listen to the resize event on the window which is fired when the
     * user resizes the window.
     *
     * We're using this to resize the canvas when the user resizes the
     * window.
     */
    window.addEventListener("resize", () => {
      handleResize({
        canvas: fabricRef.current,
      });
    });

    // /**
    //  * listen to the key down event on the window which is fired when the
    //  * user presses a key on the keyboard.
    //  *
    //  * We're using this to perform some actions like delete, copy, paste, etc when the user presses the respective keys on the keyboard.
    //  */
    // window.addEventListener("keydown", (e) =>
    //   handleKeyDown({
    //     e,
    //     canvas: fabricRef.current,
    //     undo,
    //     redo,
    //     syncShapeInStorage,
    //     deleteShapeFromStorage,
    //   })
    // );

    // // dispose the canvas and remove the event listeners when the component unmounts
    // return () => {
    //   /**
    //    * dispose is a method provided by Fabric that allows you to dispose
    //    * the canvas. It clears the canvas and removes all the event
    //    * listeners
    //    *
    //    * dispose: http://fabricjs.com/docs/fabric.Canvas.html#dispose
    //    */
    //   canvas.dispose();

    //   // remove the event listeners
    //   window.removeEventListener("resize", () => {
    //     handleResize({
    //       canvas: null,
    //     });
    //   });

    //   window.removeEventListener("keydown", (e) =>
    //     handleKeyDown({
    //       e,
    //       canvas: fabricRef.current,
    //       undo,
    //       redo,
    //       syncShapeInStorage,
    //       deleteShapeFromStorage,
    //     })
    //   );
    // };
  }, [canvasRef]); // run this effect only once when the component mounts and the canvasRef changes

  return (
    // <div className="h-[100vh] w-full flex justify-center items-center">
    <main className="h-screen overflow-hidden">
      <Navbar />
      <section className="flex h-full flex-row">
      <LeftSidebar allShapes={[]}/>
        <Live canvasRef={canvasRef} />
      </section>
      <RightSidebar />
    </main>
    // </div>
  );
}
