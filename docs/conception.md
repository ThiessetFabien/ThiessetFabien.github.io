# ANALYSE DES BESOINS

## 1. Contexte D'utilisation

| **Détails** |                                                            |
| ----------- | ---------------------------------------------------------- |
| **Objectif**    | Faire un Port-Blog-folio                                   |
| **Besoin**      | Répond au besoin de recrutement dans le développement web. |

## 2. Identifier Les Utilisateurs

| **Détails**                    |                                                                                                                                                                                                                                                             |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Quels utilisateurs ?**       | L'administrateur et des recruteurs.<br>                                                                                                                                                                                                                     |
| **Pour quelle utilisation ?**  | -> L'administrateur peut ajouter, modifier ou supprimer des projets et du contenu, et répondre aux recruteurs. <br><br>-> Les recruteurs peuvent découvrir mes projets, ma présentation, me suivre sur les réseaux sociaux, me contacter, récupérer mon CV. |
| **Rôles et pages accessibles** | -> Administrateur : Gestion de contenu <br>-> Recruteurs : Consultation de ma présentation, de mon expérience et mes articles.                                                                                                                              |

## 3. Exigences De Fonctionnement

| **Détails**                 |                                                                                                                                                                                                                                                                                                                           |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Actions Possibles**       | - Les recruteurs n'ont pas besoin de se connecter. <br><br> Présentation : <br>-> Ma personne <br>-> Mes projets <br>-> Mes compétences <br>-> Mes formations <br>-> Mes expériences <br>-> Me localiser <br>-> Me suivre sur les réseaux sociaux <br>-> Me contacter (mail/téléphone)<br>-> Consulter/Télécharger mon CV |
| **Sécurité Et Performance** | - Le front-end doit être compatible avec les navigateurs récents et len mobile first. <br> - Le site doit maintenir des performances optimales.                                                                                                                                                                           |

## 4. Expérience Utilisateur

-> Permettre aux recruteurs de prendre contact rapidement.
-> Le code doit montrer l'étendue de mes compétences sans altérer l'UX/UI.
-> Le site doit mettre en avant les informations importantes.

## 5. Accessibilité et Référencement

-> Présente plusieurs niveau d'accessibilité selon les directives gouvernementales.
-> Respecter les bonnes pratiques de référencement pour un bon référencement naturel.

## 6. Choix Des Technologies

| **Détails**        |                                                                                                                                                      |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Fonctionnement** | -> Next.js pour le rendu côté serveur et la génération de pages statiques. <br> -> React Router pour la navigation. <br> -> Axios pour les requêtes. |
| **Graphique**      | -> CSS (monter en compétence sur SASS, Tailwind) <br>-> Explorer shacn/ui qui utilise Tailwind.                                                      |
| **Sécurité**       | -> Explorer react-sanitize pour nettoyer les données entrées par l'utilisateur et éviter les injections de code malveillant.                         |

## 7. MVP (Produit Minimum Viable)

| **Détails**                                                                                                                                                                                                 |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Le MVP comprendra : <br> - Une page d'accueil présentant mes informations personnelles et mes compétences. <br> - Une section pour afficher mes projets avec des descriptions et des liens. <br> - Un formulaire de contact simple permettant aux recruteurs de me contacter. <br> - Liens vers mes profils sur les réseaux sociaux (LinkedIn, GitHub). |

## 8. Évolutions Envisageables

| **Détails**                                                                                                                                                                                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| -> Animer subtilement le portfolio<br>-> Mettre des micros vidéos de présentation des projets<br>-> Ajout d'une section blog pour partager des articles sur le développement web et mes expériences. <br> -> Intégration d'un système de gestion de contenu (CMS) pour faciliter la mise à jour des projets et des informations. <br> -> Mise en place |
