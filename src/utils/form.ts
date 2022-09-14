/**
 * withKey
 * Safely update a key, value object
 * @param object
 * @param key
 * @param value
 */
export function withKey<K extends keyof any, V>(object: Partial<Record<K, V>>, key: K, value: V){
    const next = {...object}
    if(value === undefined){
        delete next[key]
    } else {
        switch (typeof value){
        case "string":
            next[key] = value.trim() as any
            break
        default:
            next[key] = value
            break
        }
    }
    return next as any
}

/**
 * changeSet
 * @param from
 * @param to
 */
export function changeSet<K extends keyof any, V>(from?: Partial<Record<K, V>>, to?: Partial<Record<K, V>>){
    const fromObj: any = from || {}
    const toObj: any = to || {}
    const keys = Object.keys(toObj)
    const changes: any = {}
    let hasChanges = false
    keys.forEach(k => {
        if(fromObj[k] != toObj[k]){
            changes[k] = toObj[k]
            hasChanges = true
        }
    })
    return hasChanges ? changes : null
}