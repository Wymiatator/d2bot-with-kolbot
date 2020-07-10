/**
 *	@filename	DiaBaalLeader.js
 *	@author		Marek Roefler
 *	@desc		clear Chaos Sanctuary and kill Diablo then clear Throne of Destruction and kill Baal
 */

function DiaBaalLeader() {
    // start
    Town.doChores();

    if (!TeamBO.syncBO(107)) {
        Precast.doPrecast(true);
    }

	if (me.area !== 107) {
		Pather.useWaypoint(107);
    }
    

    // TEMP: return to town
    Pather.useWaypoint(103);
}