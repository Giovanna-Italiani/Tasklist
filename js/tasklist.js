const url = 'http://localhost:8080/tasks'
let tasklist;

document.onreadystatechange = () => {
    if (document.readyState == 'complete') {
        taskGetAll();
        $("#searchtask-desc").keyup(search);
    }
}

function taskGetAll() {
    $("#task-list").empty();
    $.getJSON(url, function(data) {
        tasklist = data;
        const ul = $("<ul>");
        tasklist.forEach(e => {
            const status = (e.status == 'DONE') ? 'task-done' : 'task-pending';
            const li = $("<li>");
            const chk = $(`<input type='checkbox' ${(e.status == 'DONE') ? 'checked' : '' } onclick="${(e.status == 'DONE') ? 'markPending(this.value)' : 'markDone(this.value)'}" value=${e.id}>`); 
            const desc = $(`<label>${e.description}</label>`);
            ul.append(li.append(chk, desc));
        });
        $("#task-list").append(ul);
    });
        
}

function taskCreate(){
    const description = $("#addtask-desc").val();
    const body = `{"description": "${description}"}`;

    $.ajax({
        type: "POST",
        url: url,
        data: body,
        success: (res) => {
            console.log('post done.');
            taskGetAll();
        },
        contentType: "application/json",
        dataType: "json"
    });
}

function markDone(id){
    console.log('markDone', id);
    for (const e of tasklist) {
        console.log(e.id, id);
        if (e.id == id) {
            const body = `{"description": "${e.description}", "status": "DONE"}`;
            $.ajax({
                type: "PUT",
                url: `${url}/${e.id}`,
                data: body,
                success: (res) => {
                    taskGetAll()
                },
                contentType: "application/json",
                dataType: "json"
            })
        }
    }
}

const markPending = (id) => {
    console.log('markPending', id);
    for (const e of tasklist) {
        console.log(e.id, id);
        if (e.id == id) {
            const body = `{"description": "${e.description}", "status": "PENDING"}`;
            $.ajax({
                type: "PUT",
                url: `${url}/${e.id}`,
                data: body,
                success: (res) => {
                    taskGetAll()
                },
                contentType: "application/json",
                dataType: "json"
            })
        }
    }
}

const search  = () => {
    const desc = $("#searchtask-desc").val();
    console.log(desc);

    $("#task-list").empty();
    $.getJSON(`${url}/desc/${desc}`, function(data) {
        tasklist = data;
        const ul = $("<ul>");
        tasklist.forEach(e => {
            const status = (e.status == 'DONE') ? 'task-done' : 'task-pending';
            const li = $("<li>");
            const chk = $(`<input type='checkbox' ${(e.status == 'DONE') ? 'checked' : '' } onclick="${(e.status == 'DONE') ? 'markPending(this.value)' : 'markDone(this.value)'}" value=${e.id}>`); 
            const desc = $(`<label>${e.description}</label>`);
            ul.append(li.append(chk, desc));
        });
        $("#task-list").append(ul);
    });

}


