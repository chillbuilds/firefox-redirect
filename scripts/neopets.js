if(parsedHostname(window.location.href) == 'https://www.neopets.com/bank.phtml'){
    let balance = $('#txtCurrentBalance1').text().split(': ')[1].split(' NP').join('').split(',').join('')
    balance = parseInt(balance)
    balance = balance*2
    balance = balance.toLocaleString()
    balance = `Current Balance: ${balance} NP`
    $('#txtCurrentBalance1').text(balance)
}

if(parsedHostname(window.location.hostname) == 'neopets.com' && 
   window.location.href != 'https://www.neopets.com/'){

    $(document).ready(function() {

        let savedLinks;

        if(!localStorage.getItem('addon-links')){
            localStorage.setItem('addon-links', '[]')
        }else{
            savedLinks = localStorage.getItem('addon-links')
        }

        if(!localStorage.getItem('searchPref')){
            localStorage.setItem('searchPref', 'exact')
            $('input[type="radio"][value="exact"]').prop('checked', true)
        }

        let helperDiv = $('<div>').attr('style', `
            margin-left: 8px;
            padding: 10px; 
            border: 1px solid black; 
            background: #FFD123; 
            position: fixed; 
            left: 0px; 
            top: 120px; 
            z-index: 10;
            text-align: left;
            font-family: MuseoSansRounded500, Arial, sans-serif;
            user-select: none;
            font-size: 16px;
            width: 150px;
            `)
        let switchDiv = $('<div>').html(`
            <div style="position:relative; float:left; cursor:pointer;" onClick="toggleSSW()">
                super shop wizard
            </div>
            <div style="position:relative; float:left; cursor:pointer; right:-5px; top:1px;" onClick="toggleSettings()">
                <img style="width:16px;" src="https://imgur.com/Ot3roHO.png">
            </div>
            <br>
            <div id="ssw-toggle-settings" style="display:none; font-size:14px; margin-top:8px; margin-left:4px;">search default:
                <div>
                    <label><input type="radio" name="searchOpt" value="containing">containing</label>
                </div>
                <div>
                    <label><input type="radio" name="searchOpt" value="exact">identical</label>
                </div>
            </div>
            <div style="margin-top:8px;">links <img style="width:16px; position:relative; top:2px; cursor:pointer;" id="addLink" src="https://imgur.com/wfaGW0y.png"></div>
            
            <div id="addLinkForm" style="display:none; margin-top:6px; padding-bottom:4px;">
                <input id="newLinkTitle" style="width:150px;" placeholder="title"><br>
                <input id="newLink" style="width:150px;" placeholder="link"><br>
                <button onClick="addLink()">add</button><span style="margin-left:4px; font-size:14px;">new tab</span><input type="checkbox" id="newTabCheck">
            </div>

            <div id="userLinks">
            </div>

            <div style="margin-top:8px; cursor:pointer;" onClick="collectVE()">
                collect void essence
            </div>

            <script>

            let collectVE = () => {
                if($('.tvw-essence')){
                    console.log($('.tvw-essence'))
                    let ve = $('.tvw-essence')
                    $(ve[0]).click()
                }
            }

            let removeLink = (title) => {
                let confirmResponse = confirm(\`are you sure you want to delete the following link: \${title}\`)
                if(confirmResponse){
                    let currentSavedLinks = JSON.parse(localStorage.getItem('addon-links'))
                    currentSavedLinks = currentSavedLinks.filter(link => link.title !== title)
                    localStorage.setItem('addon-links', JSON.stringify(currentSavedLinks))
                    updateLinks()
                }
            }

                let updateLinks = () => {
                    $('#userLinks').html('')
                    let currentSavedLinks = JSON.parse(localStorage.getItem('addon-links'))
                    currentSavedLinks.forEach((link, i) => {
                        let linkBG = ''
                        if(i % 2 == 0){
                            linkBG = 'background:rgba(255, 255, 255, 0.2);'
                        }
                        let target = '_self'
                        if(link.newTab == true){
                            target = '_blank'
                        }
                        $('#userLinks').append(\`
                        <div style="position:relative; top:4px; \${linkBG}">
                            <div onClick="removeLink('\${link.title}')" style="position:relative; float:left; cursor:pointer; margin-right:4px; margin-top:3px;">
                                <img style="width:12px;" src="https://imgur.com/I0VBYj3.png">
                            </div>
                            <div style="margin:2px 0px;">
                                <a target="\${target}" href="\${link.link}">
                                    \${link.title}
                                </a>
                            </div>
                        </div>
                        \`)    
                    })
                }   


                let addLink = () => {
                    if($('#newLinkTitle').val() && $('#newLink').val()){
                    let newTab = false
                    if ($('#newTabCheck').prop('checked')) {
                        newTab = true
                    }
                        let currentSavedLinks = JSON.parse(localStorage.getItem('addon-links'))
                        let linkObj = {title: $('#newLinkTitle').val(), link: $('#newLink').val(), newTab: newTab}
                        currentSavedLinks.push(linkObj)
                        localStorage.setItem('addon-links', JSON.stringify(currentSavedLinks))
                        updateLinks()
                    }else{
                    alert("can't add new link. link or title is missing.")
                    }
                    
                }

                $('input[name="searchOpt"]').on('change', function() {
                    localStorage.setItem('searchPref', $(this).val())
                    $('#ssw-criteria').val(localStorage.getItem('searchPref'))
                })
                let toggleSSW = () => {
                    if(typeof toggleSSW__2020 != 'undefined'){
                        if($('#ssw__2020').attr('style') == 'display: none;' || $('#ssw__2020').attr('style') == undefined){
                            toggleSSW__2020()
                        }
                    }
                    $('.sswdrop').removeClass('panel_hidden')
                    $('.sswdrop').addClass('panel_shown')
                    $('.sswdrop').attr('style', 'bottom:20px;')
                    $('#ssw-criteria').val(localStorage.getItem('searchPref'))
                    $('#button-new-search').click()
                    $('#ssw-button-new-search').click()
                    $('#searchstr').val('')
                    $('#searchstr').focus()

                }
                let toggleSettings = () => {
                    $('#ssw-toggle-settings').slideToggle()
                    
                    let searchPref = localStorage.getItem('searchPref')

                    if(searchPref == 'exact'){
                        $('input[type="radio"][value="exact"]').prop('checked', true)
                    }
                    if(searchPref == 'containing'){
                        $('input[type="radio"][value="containing"]').prop('checked', true)
                    }
                }

                $('#addLink').on('click', function(){
                    $('#addLinkForm').slideToggle()
                })

                updateLinks()
                setInterval(function() {
                    let currentLinks = $('#userLinks').children()
                    let storedLinks = JSON.parse(localStorage.getItem('addon-links'))
                    if(currentLinks.length != storedLinks.length){
                        updateLinks()
                    }
                }, 2000)
            </script>
            `)

        helperDiv.append(switchDiv)
        $('body').prepend(helperDiv)
    })

}