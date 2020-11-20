export const updateObjectInArray = (items, objPropName, itemId, newProps) => {
    return items.map(item => {
        if (item[objPropName] === itemId) {
            return {
                ...item,
                ...newProps
            }
        }
        return item
    })
}