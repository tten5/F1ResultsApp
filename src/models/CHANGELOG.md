# Version 1.1.0
Date: 02 Jul 2023

**Changes**:
- Added a new field `real_pts"` to the Participation Model.
    - `points` field shows original racing result of a driver when client checks 1 specific Grand Prix 
    - `real_pts` stores points that has been calculated and recorded to driver's final result 
    - Driver final sum points is calculated based on `real_pts`, but not `points`
- Modified docs to accommodate the `real_pts` field.
   
Author: tten5
