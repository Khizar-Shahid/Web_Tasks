class MovieCollection {
    constructor() {
        this.movies = [];
    }

    // Add a new movie to the collection
    addMovie(title, director, genre, year) {
        // Basic validation
        if (!title || typeof title !== 'string' || title.trim() === '') {
            console.log("Error: Title is required.");
            return false;
        }
        if (!director || typeof director !== 'string' || director.trim() === '') {
            console.log("Error: Director is required.");
            return false;
        }
        if (!genre || typeof genre !== 'string' || genre.trim() === '') {
            console.log("Error: Genre is required.");
            return false;
        }
        if (!year || isNaN(year) || year < 1880 || year > 2100) {
            console.log("Error: Valid year (1880–2100) is required.");
            return false;
        }

        const movie = {
            title: title.trim(),
            director: director.trim(),
            genre: genre.trim(),
            year: Number(year)
        };

        this.movies.push(movie);
        console.log(`Added: "${movie.title}" (${movie.year})`);
        return true;
    }

    // Display all movies in a nice formatted way
    // Uses .map() and .join() as required
    listMovies() {
        if (this.movies.length === 0) {
            console.log("Your movie collection is empty.");
            return;
        }

        console.log(`\nYour Movie Collection (${this.movies.length} movies):`);
        console.log("─".repeat(60));

        const formatted = this.movies
            .map((movie, index) => {
                return `${String(index + 1).padStart(3, ' ')}. ` +
                       `"${movie.title}" (${movie.year})\n` +
                       `    Director: ${movie.director}\n` +
                       `    Genre:    ${movie.genre}`;
            })
            .join("\n\n");

        console.log(formatted);
        console.log("─".repeat(60));
    }

    // Find movies by director (case-insensitive)
    searchByDirector(director) {
        if (!director || typeof director !== 'string' || director.trim() === '') {
            console.log("Please provide a director name.");
            return [];
        }

        const searchTerm = director.toLowerCase().trim();

        const results = this.movies.filter(movie =>
            movie.director.toLowerCase().includes(searchTerm)
        );

        return results;
    }

    // Find movies by genre (case-insensitive)
    searchByGenre(genre) {
        if (!genre || typeof genre !== 'string' || genre.trim() === '') {
            console.log("Please provide a genre.");
            return [];
        }

        const searchTerm = genre.toLowerCase().trim();

        const results = this.movies.filter(movie =>
            movie.genre.toLowerCase().includes(searchTerm)
        );

        return results;
    }

    // Helper method - nice formatted search results
    printSearchResults(results, searchType, query) {
        if (results.length === 0) {
            console.log(`No movies found for ${searchType}: "${query}"`);
            return;
        }

        console.log(`\nFound ${results.length} movie(s) for ${searchType}: "${query}"`);
        console.log("─".repeat(50));

        results.forEach((movie, i) => {
            console.log(
                `${i + 1}. "${movie.title}" (${movie.year}) ` +
                `— ${movie.director} • ${movie.genre}`
            );
        });

        console.log("─".repeat(50));
    }
}

// ────────────────────────────────────────────────
// Example usage / test cases:

const collection = new MovieCollection();

collection.addMovie("Inception", "Christopher Nolan", "Sci-Fi", 2010);
collection.addMovie("The Dark Knight", "Christopher Nolan", "Action", 2008);
collection.addMovie("Interstellar", "Christopher Nolan", "Sci-Fi", 2014);
collection.addMovie("Parasite", "Bong Joon-ho", "Thriller", 2019);
collection.addMovie("Dune", "Denis Villeneuve", "Sci-Fi", 2021);
collection.addMovie("Dune: Part Two", "Denis Villeneuve", "Sci-Fi", 2024);
collection.addMovie("Everything Everywhere All at Once", "Daniel Kwan & Daniel Scheinert", "Comedy", 2022);

// List all movies
collection.listMovies();

// Search examples
const nolanMovies = collection.searchByDirector("nolan");
collection.printSearchResults(nolanMovies, "director", "Nolan");

const scifiMovies = collection.searchByGenre("sci-fi");
collection.printSearchResults(scifiMovies, "genre", "sci-fi");

const thrillerMovies = collection.searchByGenre("thriller");
collection.printSearchResults(thrillerMovies, "genre", "Thriller");

// Try invalid cases
collection.addMovie("", "Someone", "Drama", 2023);           // should fail
collection.addMovie("Test", "Director", "", 2025);            // should fail
collection.searchByDirector("");                              // should warn