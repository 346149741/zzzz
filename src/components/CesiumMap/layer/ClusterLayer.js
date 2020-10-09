export default class ClusterLayer {
  constructor(newMap3d, symbol) {
    this.newMap3d = newMap3d
    this.clusterDataSource = new Cesium.CustomDataSource('clusterDataSource')
    this.newMap3d.viewer.dataSources.add(this.clusterDataSource)
    this.custerStyle(symbol)
  }
  custerStyle(symbol) {
    var that = this
    var pixelRange = 20
    var minimumClusterSize = 3
    var enabled = true

    that.clusterDataSource.clustering.enabled = enabled
    that.clusterDataSource.clustering.pixelRange = pixelRange
    that.clusterDataSource.clustering.minimumClusterSize = minimumClusterSize

    var removeListener

    if (Cesium.defined(removeListener)) {
      removeListener = undefined
    } else {
      removeListener = that.clusterDataSource.clustering.clusterEvent.addEventListener(function(clusteredEntities, cluster) {
        cluster.label.show = false
        cluster.label.font = '20px'
        cluster.label.fillColor = Cesium.Color.WHITE
        // cluster.label.pixelOffset = new Cesium.Cartesian2(-8, 0)
        cluster.label.horizontalOrigin = Cesium.HorizontalOrigin.CENTER
        cluster.label.verticalOrigin = Cesium.VerticalOrigin.CENTER
        cluster.label.eyeOffset = new Cesium.Cartesian3(0, 0, -100)
        cluster.billboard.show = true
        cluster.billboard.id = cluster.label.id

        // cluster.billboard.verticalOrigin = Cesium.VerticalOrigin.Center;

        // if (clusteredEntities.length >= 50) {
        //   cluster.billboard.image = require('@/assets/cluster/darkRed.png')
        // } else if (clusteredEntities.length >= 40) {
        //   cluster.billboard.image = require('@/assets/cluster/red.png')
        // } else if (clusteredEntities.length >= 30) {
        //   cluster.billboard.image = require('@/assets/cluster/orange.png')
        // } else if (clusteredEntities.length >= 20) {
        //   cluster.billboard.image = require('@/assets/cluster/blue.png')
        // } else if (clusteredEntities.length >= 0) {
        //   cluster.billboard.image = require('@/assets/cluster/green.png')
        // } else {
        //   // cluster.billboard.image = require('@/assets/cluster/green.png')
        // }

        if (clusteredEntities.length >= 1) {
          if (symbol.billboardIcon) {
            cluster.billboard.image = symbol.billboardIcon.url
            cluster.billboard.scaleByDistance = new Cesium.NearFarScalar(10, 1.5, 500000, 0.5)
          }
        }
      })
    }
    // force a re-cluster with the new styling
    var pixelRange2 = that.clusterDataSource.clustering.pixelRange
    that.clusterDataSource.clustering.pixelRange = 0
    that.clusterDataSource.clustering.pixelRange = pixelRange2
  }
}
