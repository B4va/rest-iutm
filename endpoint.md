# Endpoints API

## Utilisateurs

### Consultation de tous les utilisateurs

**URL** : `GET /api/utilisateur`

### Consultation d'un utilisateur

**URL** : `GET /api/utilisateur/:id`

### Création d'un utilisateur

**URL** : `POST /api/utilisateur`

Exemple de données au format JSON :

```json
{
    "nom": "Hugo",
    "prenom": "Victor",
    "email": "vh@mail.com",
    "bio": "J'ai écrit les Misérables."
}
```

Exemple de données au format XML :

```xml
<utilisateur>
	<nom>Hugo</nom>
	<prenom>Victor</prenom>
	<email>vh@mail.com</email>
	<bio>J'ai écrit les Misérables.</bio>
</utilisateur>
```

### Modification partielle d'un utilisateur

**URL** : `PATCH /api/utilisateur/:id`

Reprend les mêmes données que pour une création d'utilisateur ; il est possible de modifier entièrement ou partiellement un utilisateur.

### Modification complète d'un utilisateur

**URL** : `PUT /api/utilisateur/:id`

Reprend les mêmes données que pour une création d'utilisateur ; tous les attributs doivent être renseignés.

### Suppression d'un utilisateur

**URL** : `POST /api/utilisateur/:id`