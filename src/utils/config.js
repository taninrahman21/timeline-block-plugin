export const timelineConfig = (attributes) => {
    const { type, labelLocation, startIndex, moveItem, vigibleItems, verticalTrigger, rtlMode } = attributes;

    return {
        mode: type || 'vertical',
        verticalStartPosition: labelLocation,
        horizontalStartPosition: labelLocation,
        forceVerticalMode: 700,
        verticalTrigger,
        moveItems: moveItem,
        startIndex: startIndex - 1,
        visibleItems: vigibleItems,
        rtlMode
    }
}