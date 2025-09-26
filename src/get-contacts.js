// Access API endpoint for contacts in JSON
fetch('/contacts')
    .then(res => {
        // Make sure the response is okay
        if (!res.ok) {
            throw new Error(`Network response was not ok (${res.status})`);
        }
        return res.json();
    })
    .then(data => {
        const tbody = document.getElementById('table-body');
        
        data.forEach(contact => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${contact.first_name} ${contact.last_name}</td>
                <td>${contact.company}</td>
                <td>${contact.email}</td>
                <td>${contact.phone}</td>
                <td>${contact.address}, ${contact.state} ${contact.zip_code}</td>
                <td>${contact.city}</td>
                <td>${contact.notes || ''}</td>
            `;
            tbody.appendChild(row);
        });
    })
    .catch(error => {
        const tbody = document.getElementById('table-body');
        tbody.innerHTML = `<tr><td colspan="7" style="color:red;">Failed to load contacts: ${error.message}</td></tr>`;
        console.error('Error fetching contacts:', error);
    });