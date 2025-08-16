document.getElementById('formRetour').addEventListener('submit', async (e) => {
    e.preventDefault();
    const produit = document.getElementById('produit').value;
    const commentaire = document.getElementById('commentaire').value;
    const note = document.getElementById('note').value;
    const sentiment = document.getElementById('sentiment').value;

    const response = await fetch('/api/retours', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ produit, commentaire, note: Number(note), sentiment })
    });

    if (response.ok) {
        alert('Retour soumis avec succès!');
        document.getElementById('formRetour').reset();
    } else {
        alert('Erreur lors de la soumission du retour.');
    }
});