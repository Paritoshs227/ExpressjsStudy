var table = new Tabulator("#sstudentTable", {
    layout: "fitColumns",
    ajaxURL: "http://localhost:3000/api/students",
    ajaxResponse: function (url, params, response) {
        return response.data; 
    },
    pagination: true,
    paginationSize: 5,
    paginationSizeSelector: [10, 25, 50, 100],
    placeholder: "No Data Set",
    columns: [
        { title: "firstname", field: "firstname" },
        { title: "email", field: "email" },
        { title: "age", field: "age" },
        {
            title: "Actions",
            formatter: function (cell) {
                let id = cell.getRow().getData()._id;
                return `
                    <button onclick="viewUser('${id}')">View</button>
                    <button onclick="updateUser('${id}')">Update</button>
                    <button onclick="deleteUser('${id}')">Delete</button>
                `;
            }
        }
    ],
});
