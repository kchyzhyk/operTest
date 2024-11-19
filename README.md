# Movie and TV Show Search Application

## Overview

This is a Movie and TV Show Search Application built using **Angular**. The app allows users to search for movies and TV shows and view detailed information about selected items. It fetches data from **The Movie Database (TMDb)** API to display popular, trending, and recommended movies and TV shows.

## Features

- **Search for Movies and TV Shows**: Users can search for both movies and TV shows by title.
- **Dynamic Item Details**: Click on a movie or TV show to see detailed information, such as ratings, genres, and an overview.
- **Responsive**: The application is optimized for both desktop and mobile viewing.
- **Infinite Scroll**: Movie and TV Show lists are displayed with infinite scrolling.

## Technologies Used

- **Frontend**: Angular, TypeScript, SCSS
- **Backend/API**: TMDb API
- **Routing**: Angular Router
- **State Management**: RxJS
- **Forms**: Angular Forms

## Setup and Installation

### Prerequisites

- **Node.js** (v16 or higher)
- **Angular CLI**

### Installation Steps

1. Clone the repository to your local machine:

   git clone <repository_url>
   cd <project_directory>

2. Install the necessary dependencies:

   npm install

3. Start the application:

   ng serve

4. Open the application in your browser:
   Navigate to http://localhost:4200 to see the app running.

## API Integration

The app interacts with the TMDb API to fetch movie and TV show data.

# API Endpoints Used:

- Popular Movies: GET /movie/popular
- Popular TV Shows: GET /tv/popular
- Search for Movies/TV Shows: GET /search/multi?query=<search_term>
- Item Details: GET /movie/<id> or GET /tv/<id>

## Components

# SearchBarComponent

- Provides an input field for users to search for movies and TV shows.
- Implements live search with debounced input.
- Displays search results dynamically.

# ItemListComponent

- Displays a list of movies and TV shows.
- Uses infinite scrolling to load more items as the user scrolls.

# ItemDetailComponent

- Displays detailed information for selected movies or TV shows.
- Fetches the item details from the API based on the item type (movie or tv) and ID.

## Routes

# Main Routes

- Home: / (Displays trending and popular items)
- Item Detail: /item/:type/:id (Displays details of a specific movie or TV show) - :type: movie or tv - :id: The unique ID of the item

# Example:

    /item/movie/12345 — Shows details of a movie with ID 12345
    /item/tv/1396 — Shows details of the TV show "Breaking Bad"
