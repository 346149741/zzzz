export default class EntityLayer {
  constructor(newMap3d) {
    this.newMap3d = newMap3d
    this.dataSource = new Cesium.CustomDataSource()
    this.newMap3d.addDataSource(this.dataSource)
  }

  insertData(entityObj, info = {}) {
    if (entityObj.constructor.name === 'Object') {
      const entity = this.dataSource.entities.add(entityObj)
      entity.info = info
      entity.popup = info.popResult || {}
    } else if (entityObj.constructor.name === 'Entity') {
      this.dataSource.entities.add(entityObj)
      entityObj.info = info
      entityObj.popup = info.popResult || {}
    }
  }

  setVisible(val) {
    if (val) {
      this.newMap3d.addDataSource(this.dataSource)
    } else {
      this.newMap3d.removeDataSource(this.dataSource)
    }
  }

  getEntities() {
    return this.dataSource.entities.values
  }

  getEntity(id) {
    return this.getEntities().find((item) => {
      return item.info && id === item.info.id
    })
  }

  zoomToEntity(id) {
    const ent = this.getEntity(id)
    if (ent) {
      this.newMap3d.zoomTo(ent)
    }
  }

  removeEntity(id) {
    const ent = this.getEntity(id)
    if (ent) {
      this.dataSource.entities.remove(ent)
    }
  }

  clearEntities() {
    this.dataSource.entities.removeAll()
  }
}
