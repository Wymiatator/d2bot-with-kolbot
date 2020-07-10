/**
 *	@filename	DiaBaalLeader.js
 *	@author		Marek Roefler
 *	@desc		give/get BO as a team
 */

var TeamBO = {

    syncBO: function (targetArea) {

        try {
            Pather.useWaypoint(targetArea, true);
        } catch (wperror) {
            showConsole();
            print("ÿc1Failed to take waypoint.");
            quit();
        }

        Pather.moveTo(me.x + 6, me.y + 6);

        delay(1000);

        var i, party, missingPlayers, unit;
        var BOStatus = [];

        /*
WaitLoop:
        for (i = 0; i < Config.TeamBO.Wait; i += 1) {
			party = getParty();
            missingPlayers = false;

            // check if all party members are in the area
			if (party) {
				do {
					if (!getUnit(0, party.name)) {
                        missingPlayers = true;
					}
				} while (party.getNext());
            }
            
            if (!missingPlayers) {
				break WaitLoop;
            }

			Attack.clear(10, 0, false, this.sort);
			delay(1000);
        }
        */
        
        // wait for players in the area and BO once they're in
MainLoop:
        for (i = 0; i < Config.TeamBO.Wait; i += 1) {
            if (Config.TeamBO.Give) {
                party = getParty();
                missingPlayers = false;

                // check if all party members got BO
                if (party) {
                    do {
                        if (!BOStatus[party.name]) {
                            unit = getUnit(0, party.name);
                            if (unit) {
                                if (!unit.getState(32) || !unit.getState(51) || !unit.getState(26)) {
                                    Precast.doPrecast(true);
                                }

                                // just double check and set status
                                if (unit.getState(32) && unit.getState(51) && unit.getState(26)) {
                                    BOStatus[party.name] = true;
                                } else {
                                    // somehow he didn't receive BO... Out of range?
                                    missingPlayers = true;
                                }
                            } else {
                                missingPlayers = true;
                            }
                        }
                    } while (party.getNext());
                }

                if (!missingPlayers) {
                    delay(1000);
                    break MainLoop;
                }

            } else {
                if (me.getState(32) && me.getState(51) && me.getState(26)) {
                    Precast.doPrecastNoCTA(true);
                    delay(1000);
                    break MainLoop;
                }
            }

            delay(1000);
        }

        return i === Config.TeamBO.Wait;
    }

};