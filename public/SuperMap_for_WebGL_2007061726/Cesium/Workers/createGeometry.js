/**
 * Cesium - https://github.com/AnalyticalGraphicsInc/cesium
 *
 * Copyright 2011-2017 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/AnalyticalGraphicsInc/cesium/blob/master/LICENSE.md for full licensing details.
 */
define(['./when-8d13db60', './Check-70bec281', './Math-61ede240', './Cartesian2-2cbe6c75', './BoundingSphere-51445700', './RuntimeError-ba10bc3e', './WebGLConstants-4c11ee5f', './ComponentDatatype-5862616f', './GeometryAttribute-ec5c2270', './PrimitiveType-97893bc7', './FeatureDetection-7bd32c34', './Transforms-2f2aa225', './buildModuleUrl-46c77f41', './GeometryAttributes-aacecde6', './AttributeCompression-50ff7145', './GeometryPipeline-cf04afb6', './EncodedCartesian3-c30f641c', './IndexDatatype-9435b55f', './IntersectionTests-99e636d3', './Plane-d0f009aa', './PrimitivePipeline-8dc6083e', './WebMercatorProjection-0391f892', './createTaskProcessorWorker'], function (when, Check, _Math, Cartesian2, BoundingSphere, RuntimeError, WebGLConstants, ComponentDatatype, GeometryAttribute, PrimitiveType, FeatureDetection, Transforms, buildModuleUrl, GeometryAttributes, AttributeCompression, GeometryPipeline, EncodedCartesian3, IndexDatatype, IntersectionTests, Plane, PrimitivePipeline, WebMercatorProjection, createTaskProcessorWorker) { 'use strict';

    /* global require */

    var moduleCache = {};

    function getModule(moduleName) {
        var module = moduleCache[moduleName];
        if (!when.defined(module)) {
            if (typeof exports === 'object') {
                // Use CommonJS-style require.
                moduleCache[module] = module = require('Workers/' + moduleName);
            } else {
                // Use AMD-style require.
                // in web workers, require is synchronous
                require(['Workers/' + moduleName], function(f) {
                    module = f;
                    moduleCache[module] = f;
                });
            }
        }
        return module;
    }

    function createGeometry(parameters, transferableObjects) {
        var subTasks = parameters.subTasks;
        var length = subTasks.length;
        var resultsOrPromises = new Array(length);

        for (var i = 0; i < length; i++) {
            var task = subTasks[i];
            var geometry = task.geometry;
            var moduleName = task.moduleName;

            if (when.defined(moduleName)) {
                var createFunction = getModule(moduleName);
                resultsOrPromises[i] = createFunction(geometry, task.offset);
            } else {
                //Already created geometry
                resultsOrPromises[i] = geometry;
            }
        }

        return when.when.all(resultsOrPromises, function(results) {
            return PrimitivePipeline.PrimitivePipeline.packCreateGeometryResults(results, transferableObjects);
        });
    }
    var createGeometry$1 = createTaskProcessorWorker(createGeometry);

    return createGeometry$1;

});
