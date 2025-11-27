$(document).ready(function () {
    $('#staudentTable').DataTable({
        ajax: {
            url: 'http://localhost:3000/api/students',
            dataSrc: 'data'
        },
        columns: [
            {
                data: null,
                title: 'S.no',
                render: function (data, type, row , meta ) {
                    return meta.row +1
                }
            },
            { data: 'firstname' },
            { data: 'email' },
            { data: 'age' },
            {
                data: '_id',
                render: function (data, type, row) {
                    return `
<button onclick="viewUser('${data}')">View</button>
<button onclick="updateUser('${data}')">Update</button>
<button onclick="deleteUser('${data}')">Delete</button>
`
                }

            },

        ]
    });
});