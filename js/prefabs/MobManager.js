function MobManager(defaultCohesionDistance, defaultSeparationDistance, defaultHeadingDistance, defaultCohesionWeight, defaultSeparationWeight, defaultHeadingWeight){
   this.mobList = [];
   this.defaultCohesionDistance = defaultCohesionDistance;
   this.defaultSeparationDistance = defaultSeparationDistance;
   this.defaultHeadingDistance = defaultHeadingDistance;
   this.defaultCohesionWeight = defaultCohesionWeight;
   this.defaultSeparationWeight = defaultSeparationWeight;
   this.defaultHeadingWeight = defaultHeadingWeight;
/*
   this.mobJointHeadingX = ;
   this.mobJointHeadingY = ;
*/
}
MobManager.prototype.constructor = MobManager;
MobManager.prototype.addMob = function(mob){
   if(mob.cohesionDistance === null){
      mob.cohesionDistance = this.defaultCohesionDistance;
   }
   if(mob.separationDistance === null){
      mob.separationDistance = this.defaultSeparationDistance;
   }
   if(mob.headingDistance === null){
      mob.headingDistance = this.defaultHeadingDistance;
   }
   if(mob.cohesionWeight === null){
      mob.cohesionWeight = this.defaultCohesionWeight;
   }
   if(mob.separationWeight === null){
      mob.separationWeight = this.defaultSeparationWeight;
   }
   if(mob.headingWeight === null){
      mob.headingWeight = this.defaultHeadingWeight;
   }
   if(mob.id === null){
      mob.id = genID();
   }
   this.mobList.push(mob);
};
MobManager.prototype.removeMob = function(mobToRemove){

};
MobManager.prototype.getRandomSubset = function(minQuantity, maxQuntity){
   maxQuantity = typeof maxQuantity !== 'undefined' ? maxQuantity : minQuantity;
   mobList = this.mobList;
   if(minQuantity >= mobList.length){
      return mobList;
   }
   if(maxQuantity > mobList.length){
      maxQuantity = mobList.length;
   }
   tempList = mobList.slice(mobList); // creates copy
   returnList = [];
   quantityToReturn = randInt(maxQuantity, minQuantity);
   for(i = 0; i<quantityToReturn; i++){
      randomlyChosenIndex = Math.floor(Math.random()*tempList.length);
      returnList.push(tempList.splice(randomlyChosenIndex, 1));
   }
   return returnList;
};
MobManager.prototype.update = function(){//(goalPoint, goalWeight)
   //l("DEBUG: MM Update Called");
   var mobList = this.mobList;
   //l(mobList); works

   mobList.forEach(function(mob){
      //mob.setGoalVector(goalPoint, goalWeight);
      updateFlocking(mob, getNeighbors(mob, mobList));
   });


   function getNeighbors(sourceMob, mobList){
      cDist = sourceMob.cohesionDistance;
      sDist = sourceMob.separationDistance;
      hDist = sourceMob.headingDistance;
      //l("cDist: " + cDist + ", sDist: " + sDist + ", hDist: " + hDist); Works

      cohesionNeighbors = [];
      separationNeighbors = [];
      headingNeighbors = [];

      seperationVectorMultiplier = 1;

      //l("DEBUG: moblist: " + mobList); Works
      //l(sourceMob);

      for(var x in mobList){
         mob = mobList[x];
         //l("mobx: " + mob.x + ", moby: " + mob.y + ", sourcex: " + sourceMob.x + ", sourcey: " + sourceMob.y);
         if(mob!=sourceMob){ //prevents addition of self to neighbor group
            dist = distanceBetween(mob.x, mob.y, sourceMob.x, sourceMob.y);
            //l("distance: "  + dist); //Works
            if(dist <= cDist){
               cohesionNeighbors.push(mob);
            }
            if(dist <= sDist){
               separationNeighbors.push(mob);
               if(dist <= sDist/4){
                  mob.velocityOverride("random");
               }
               /*
               if(dist <= sDist/2){
                  l("doubling effect of seperation");
                  seperationVectorMultiplier = 2;
                  if(dist <= sDist/4){
                     l("quadrupling effect of separationPointration");
                     seperationVectorMultiplier = 4;
                  }
               }
               */
            }
            if(dist <= hDist){
               headingNeighbors.push(mob);
            }
         }
      }
      return{cN: cohesionNeighbors, sN: separationNeighbors, hN: headingNeighbors};//, sVM: seperationVectorMultiplier
   }

   function updateFlocking(mob, neighbors){
      if(neighbors.cN.length>0){
      //l(neighbors);
   }
      //l("DEBUG: updateFlocking Called"); Works
      cWeight = mob.cohesionWeight;
      sWeight = mob.separationWeight;
      hWeight = mob.headingWeight;

      //movement = mob.getCurrentMovement();
      //heading = mob.getCurrentHeading();
      //
      //l(cWeight + " , " + sWeight + " , " + hWeight); //1, 1, 1

      calcHeading = averageHeading(mob, neighbors.hN);
      calcCohesion = averageCohesion(mob, neighbors.cN);
      calcSepraration = averageSeparation(mob, neighbors.sN);

      //l(calcHeading); //Works (but perhaps not correctly)

//NaN, NaN, NaN
/*
      l("calcH: ");
       l(calcHeading);
       l(", calcC: ");
       l(calcCohesion);
       l(", calcD: ") ;
       l(calcSepraration);
*/

      newVectorX = calcCohesion.cX*cWeight + calcSepraration.sX*sWeight + calcHeading.hX*hWeight;
      newVectorY = calcCohesion.cY*cWeight + calcSepraration.sY*sWeight + calcHeading.hY*hWeight;
      //l("nVX: " + newVectorX + ", nVY: " + newVectorY);

      //l("nVX: " + newVectorX + ", nVY: " + newVectorY); //NaN, NaN

      combinedVector = normalize(newVectorX, newVectorY);
      //l("cVX: " + combinedVector.x + ", cVY: " + combinedVector.y);

/*
      normalizationDistance = distanceBetween(0, 0, newVectorX, newVectorY);
      newVectorX /= normalizationDistance;
      newVectorY /= normalizationDistance;

      //l("nVX: " + newVectorX + ", nVY: " + newVectorY); //NaN, NaN

      mob.setFlockingVector(newVectorX, newVectorY);
*/
      mob.setFlockingVector(combinedVector.x, combinedVector.y);

      function averageHeading(mob, headingNeighbors){

         if(headingNeighbors.length<=0){ //doublecheck
            return {hX: 0, hY: 0};
         }
         //l("in avgHeading"); //Works
         headingPointX = 0;
         headingPointY = 0;
         // = mob.getHeadingPoint();
         for(var x in headingNeighbors){
            neighbor = headingNeighbors[x];
            //l(neighbor.getVelocities());
            neighborVelocities = neighbor.getVelocities();
            headingPointX += (neighborVelocities.x);
            headingPointY += (neighborVelocities.y);
            //l("hpx: " + headingPointX);
         //   l("hpy: " + headingPointY);

            //headingPointX += (neighborHeading.x - mobHeading.x);
            //headingPointY += (neighborHeading.y - mobHeading.y);
         }
         //returns the offset from a point (0, 0) of the new heading point
      //   l("hNeighbors.length = " + headingNeighbors.length);
         headingPointX /= headingNeighbors.length;
         headingPointY /= headingNeighbors.length;
         //test normalization code
         /*
         headingPointDistance = distanceBetween(headingPointX, headingPointY, 0, 0);
         //l("hpdist: " + headingPointDistance);
         if(headingPointDistance===0){
            return {hX: 0, hY: 0}; //prevents division by 0
         }
         headingPointX /= headingPointDistance;
         headingPointY /= headingPointDistance;
         //test code
         return {hX: headingPointX, hY: headingPointY};
         */ //Altered with normalization code
         headingPoint = normalize(headingPointX, headingPointY);
         return {hX: headingPoint.x, hY: headingPoint.y};
      }
      function averageCohesion(mob, cohesionNeighbors){
         cPositionX = 0;
         cPositionY = 0;
         if(cohesionNeighbors.length<=0){ //doublecheck
            return {cX: 0, cY: 0};
         }
         for(var x in cohesionNeighbors){
            neighbor = cohesionNeighbors[x];
            //cPositionX += neighbor.x;
            //cPositionY += neighbor.y;
            cPositionX += (neighbor.x - mob.x);
            cPositionY += (neighbor.y - mob.y);
            //l("cPosX = " + cPositionX);
            //l("cPosY = " + cPositionY);
         }
         cPositionX /= cohesionNeighbors.length;
         cPositionY /= cohesionNeighbors.length;
         /*cohesionPointDistance = distanceBetween(cPositionX, cPositionY, mob.x, mob.y);
         cPositionX /= cohesionPointDistance;
         cPositionY /= cohesionPointDistance;
         return {cX: cPositionX, cY: cPositionY};
         *///Altered with normalization code
        cohesionPoint = normalize(cPositionX, cPositionY);
        return {cX: cohesionPoint.x, cY: cohesionPoint.y};
      }
      function averageSeparation(mob, separationNeighbors){
         sPositionX = 0;
         sPositionY = 0;
         //l("sN.length = "  + separationNeighbors.length);
         if(separationNeighbors.length<=0){ //doublecheck
            return {sX: 0, sY: 0};
         }
         /*
         l("source: ");
         l(mob);
         l("neighbor");
         l(separationNeighbors);
         */
         for(var x in separationNeighbors){
            neighbor = separationNeighbors[x];
            //l("neighbor.x: "+ neighbor.x+ ", mob.x: "+ mob.x);
            //l("neighbor.y: "+ neighbor.y+ ", mob.y: "+ mob.y);
            sPositionX = sPositionX+ (neighbor.x - mob.x); //test, unsure about this calculation
            sPositionY = sPositionY +  (neighbor.y - mob.y);
            
            //l("sPosX: " + sPositionX + ", sPosY: " + sPositionY);
         }
         sPositionX /= separationNeighbors.length;
         sPositionY /= separationNeighbors.length;
         sPositionX *= -1;
         sPositionY *= -1;
         //l("sPosX: " + sPositionX + ", sPosY: " + sPositionY);
         separationPoint = normalize(sPositionX, sPositionY);
         /*separationPointDistance = distanceBetween(sPositionX, sPositionY, mob.x, mob.y);
         sPositionX /= separationPointDistance;
         sPositionY /= separationPointDistance;*///Altered with normalization code
         return {sX: separationPoint.x, sY: separationPoint.y};
      }

   }
};
