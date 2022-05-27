// This is dirty af but I have no time to learn VueJS / React or others. Sry about that...
// Feel free to use / upgrade it !

var updated_content = {}

function addItemToList(name, quantity) {
    let parentdiv = document.createElement('div');
    parentdiv.className = "col col-6";

    let maindiv = document.createElement('div');
    maindiv.className = "input-group mb-3";

    let itemdiv = document.createElement('div');
    itemdiv.className = "item";

    let subdiv = document.createElement('div');
    subdiv.className = "input-group-prepend";

    let span = document.createElement('span');
    span.className = "input-group-text";
    span.setAttribute('id', name);
    span.textContent = name;

    subdiv.appendChild(span);
    itemdiv.appendChild(subdiv);

    let input = document.createElement('input');
    input.setAttribute('type', 'number');
    input.className = "form-control";
    input.setAttribute('placeholder', quantity);
    input.setAttribute('aria-label', name);
    input.setAttribute('aria-describedby', name);

    itemdiv.appendChild(input);

    maindiv.appendChild(itemdiv);

    parentdiv.appendChild(maindiv);

    return parentdiv;
}

function readSingleFile(evt) {
    var f = evt.target.files[0];

    if (f) {
        var r = new FileReader();
        r.onload = function (e) {
            var content_b64 = e.target.result;
            try {
                var contents = JSON.parse(atob(content_b64)); 10
            } catch (err) {

                document.getElementById('load-error').removeAttribute("hidden");
                return;
            }

            updated_content = contents;

            document.getElementById('toggle').removeAttribute("hidden");
            document.getElementById('toggle-head').style.display = "none";

            // player
            document.getElementById('playername').placeholder = contents.save.profile.name;
            document.getElementById('trainer').placeholder = contents.save.profile.trainer;
            document.getElementById('colorpicker').defaultValue = contents.save.profile.textColor;
            document.getElementById('pokemon').value = contents.save.profile.pokemon;
            document.getElementById('trainer-shiny').checked = contents.save.profile.pokemonShiny;
            document.getElementById('background').placeholder = contents.save.profile.background;

            // eggs
            //      1
            if (contents.save.breeding.eggList[0].pokemon !== 'MissingNo.') {
                document.getElementById('egg1name').placeholder = contents.save.breeding.eggList[0].pokemon;
                document.getElementById('egg1totalsteps').placeholder = contents.save.breeding.eggList[0].totalSteps;
                document.getElementById('egg1steps').placeholder = contents.save.breeding.eggList[0].steps;
                document.getElementById('egg1shinychance').placeholder = contents.save.breeding.eggList[0].shinyChance;
            }
            //      2
            if (contents.save.breeding.eggList[1].pokemon !== 'MissingNo.') {
                document.getElementById('egg2name').placeholder = contents.save.breeding.eggList[1].pokemon;
                document.getElementById('egg2totalsteps').placeholder = contents.save.breeding.eggList[1].totalSteps;
                document.getElementById('egg2steps').placeholder = contents.save.breeding.eggList[1].steps;
                document.getElementById('egg2shinychance').placeholder = contents.save.breeding.eggList[1].shinyChance;
            }
            //      3
            if (contents.save.breeding.eggList[2].pokemon !== 'MissingNo.') {
                document.getElementById('egg3name').placeholder = contents.save.breeding.eggList[2].pokemon;
                document.getElementById('egg3totalsteps').placeholder = contents.save.breeding.eggList[2].totalSteps;
                document.getElementById('egg3steps').placeholder = contents.save.breeding.eggList[2].steps;
                document.getElementById('egg3shinychance').placeholder = contents.save.breeding.eggList[2].shinyChance;
            }
            //      4
            if (contents.save.breeding.eggList[3].pokemon !== 'MissingNo.') {
                document.getElementById('egg4name').placeholder = contents.save.breeding.eggList[3].pokemon;
                document.getElementById('egg4totalsteps').placeholder = contents.save.breeding.eggList[3].totalSteps;
                document.getElementById('egg4steps').placeholder = contents.save.breeding.eggList[3].steps;
                document.getElementById('egg4shinychance').placeholder = contents.save.breeding.eggList[3].shinyChance;
            }

            // items
            for (const item in contents.player._itemList) {
                document.getElementById('itemList').appendChild(addItemToList(item, contents.player._itemList[item]));
            }

            // pokeballs
            document.getElementById('pkbl').placeholder = contents.save.pokeballs.pokeballs[0];
            document.getElementById('grtbl').placeholder = contents.save.pokeballs.pokeballs[1];
            document.getElementById('hpbl').placeholder = contents.save.pokeballs.pokeballs[2];
            document.getElementById('msbl').placeholder = contents.save.pokeballs.pokeballs[3];

            // money
            document.getElementById('money1').placeholder = contents.save.wallet.currencies[0];
            document.getElementById('money2').placeholder = contents.save.wallet.currencies[1];
            document.getElementById('money3').placeholder = contents.save.wallet.currencies[2];
            document.getElementById('money4').placeholder = contents.save.wallet.currencies[3];
            document.getElementById('money5').placeholder = contents.save.wallet.currencies[4];
            document.getElementById('money6').placeholder = contents.save.wallet.currencies[5];

            document.getElementById('version').innerHTML = 'Actual version : ' + contents.save.update.version;
        }
        r.readAsText(f);

    }
}

download.onclick = (function () {
    let j = document.createElement("a");
    j.download = "poke-cheat-engine_" + Date.now() + ".txt";

    // player
    if (document.getElementById('playername').value) {
        updated_content.save.profile.name = document.getElementById('playername').value;
    }
    if (document.getElementById('trainer').value) {
        updated_content.save.profile.trainer = document.getElementById('trainer').value;
    }
    if (document.getElementById('colorpicker').value) {
        updated_content.save.profile.textColor = document.getElementById('colorpicker').value;
    }
    if (document.getElementById('pokemon').value) {
        updated_content.save.profile.pokemon = document.getElementById('pokemon').value;
    }
    updated_content.save.profile.pokemonShiny = document.getElementById('trainer-shiny').checked;
    if (document.getElementById('background').value) {
        updated_content.save.profile.background = document.getElementById('background').value;
    }

    // Pokeballs
    if (document.getElementById('pkbl').value) {
        updated_content.save.pokeballs.pokeballs[0] = document.getElementById('pkbl').value;
    }
    if (document.getElementById('grtbl').value) {
        updated_content.save.pokeballs.pokeballs[1] = document.getElementById('grtbl').value;
    }
    if (document.getElementById('hpbl').value) {
        updated_content.save.pokeballs.pokeballs[2] = document.getElementById('hpbl').value;
    }
    if (document.getElementById('msbl').value) {
        updated_content.save.pokeballs.pokeballs[3] = document.getElementById('msbl').value;
    }

    // Money
    if (document.getElementById('money1').value) {
        updated_content.save.wallet.currencies[0] = document.getElementById('money1').value;
    }
    if (document.getElementById('money2').value) {
        updated_content.save.wallet.currencies[1] = document.getElementById('money2').value;
    }
    if (document.getElementById('money3').value) {
        updated_content.save.wallet.currencies[2] = document.getElementById('money3').value;
    }
    if (document.getElementById('money4').value) {
        updated_content.save.wallet.currencies[3] = document.getElementById('money4').value;
    }
    if (document.getElementById('money5').value) {
        updated_content.save.wallet.currencies[4] = document.getElementById('money5').value;
    }
    if (document.getElementById('money6').value) {
        updated_content.save.wallet.currencies[5] = document.getElementById('money6').value;
    }

    // eggs
    //      1
    if (document.getElementById('egg1name').value) {
        updated_content.save.breeding.eggList[0].pokemon = document.getElementById('egg1name').value;
    }
    if (document.getElementById('egg1totalsteps').value) {
        updated_content.save.breeding.eggList[0].totalSteps = document.getElementById('egg1totalsteps').value;
    }
    if (document.getElementById('egg1steps').value) {
        updated_content.save.breeding.eggList[0].steps = document.getElementById('egg1steps').value;
    }
    if (document.getElementById('egg1shinychance').value) {
        updated_content.save.breeding.eggList[0].shinyChance = document.getElementById('egg1shinychance').value
    }

    //      2
    if (document.getElementById('egg2name').value) {
        updated_content.save.breeding.eggList[1].pokemon = document.getElementById('egg2name').value;
    }
    if (document.getElementById('egg2totalsteps').value) {
        updated_content.save.breeding.eggList[1].totalSteps = document.getElementById('egg2totalsteps').value;
    }
    if (document.getElementById('egg2steps').value) {
        updated_content.save.breeding.eggList[1].steps = document.getElementById('egg2steps').value;
    }
    if (document.getElementById('egg2shinychance').value) {
        updated_content.save.breeding.eggList[1].shinyChance = document.getElementById('egg2shinychance').value
    }

    //      3
    if (document.getElementById('egg3name').value) {
        updated_content.save.breeding.eggList[2].pokemon = document.getElementById('egg3name').value;
    }
    if (document.getElementById('egg3totalsteps').value) {
        updated_content.save.breeding.eggList[2].totalSteps = document.getElementById('egg3totalsteps').value;
    }
    if (document.getElementById('egg3steps').value) {
        updated_content.save.breeding.eggList[2].steps = document.getElementById('egg3steps').value;
    }
    if (document.getElementById('egg3shinychance').value) {
        updated_content.save.breeding.eggList[2].shinyChance = document.getElementById('egg3shinychance').value
    }

    //      4
    if (document.getElementById('egg4name').value) {
        updated_content.save.breeding.eggList[3].pokemon = document.getElementById('egg4name').value;
    }
    if (document.getElementById('egg4totalsteps').value) {
        updated_content.save.breeding.eggList[3].totalSteps = document.getElementById('egg4totalsteps').value;
    }
    if (document.getElementById('egg4steps').value) {
        updated_content.save.breeding.eggList[3].steps = document.getElementById('egg4steps').value;
    }
    if (document.getElementById('egg4shinychance').value) {
        updated_content.save.breeding.eggList[3].shinyChance = document.getElementById('egg4shinychance').value
    }

    let itemList = document.getElementsByClassName('item');
    for (i = 0; i < itemList.length; i++) {
        var text = itemList[i].firstChild.firstChild.textContent;
        var value = itemList[i].lastChild.value;
        if (value) {
            console.log("update " + text + " with value " + value);
            updated_content.player._itemList[text] = value;
        }
    }

    j.href = URL.createObjectURL(
        new Blob([btoa(JSON.stringify(updated_content, null, 2))])
    );
    j.click()
});

document.getElementById('fileinput').addEventListener('change', readSingleFile, false);