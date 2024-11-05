/*
    Author : Sapnil Basnet
    Date : 10-09-2024
    Purpose : Read and parse music library data from a JSON file or txt file and print out the album details
    Note : This program assumes that the JSON or TXT file contains valid album data.
*/

#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <cstdlib>

using namespace std;

// Enum for album genre
enum Genre { POP, ROCK, JAZZ, CLASSICAL };

// Structure for tracks
struct Track {
    string name;
    string path;
};

// Structure for album
struct Album {
    string artist;
    string name;
    Genre genre;
    int trackCount;
    vector<Track> tracks;
};

// Function to convert string to genre
//? Why this function?
//* This function is needed to convert string to genre and stores it in structure
Genre getGenreFromString(const string& genreStr) {
    if (genreStr == "POP") return POP;
    if (genreStr == "ROCK") return ROCK;
    if (genreStr == "JAZZ") return JAZZ;
    if (genreStr == "CLASSICAL") return CLASSICAL;
    return POP; // Default genre
}

// Function to print genre as a string
//? Why this function?
//* This function is needed to convert genre to string as it needs to be printed
string getGenreAsString(Genre genre) {
    switch (genre) {
        case POP: return "POP";
        case ROCK: return "ROCK";
        case JAZZ: return "JAZZ";
        case CLASSICAL: return "CLASSICAL";
        default: return "Unknown";
    }
}

// Function to load init albums
vector<Album> loadAlbumsFromFile(const string& filePath) {
    ifstream file(filePath);
    vector<Album> albums;
    int albumCount;
    file >> albumCount;
    file.ignore();
    // Checking if file is opened or not
    if (!file.good()) {
        cerr << "Error opening file: " << filePath << endl;
        return albums;
    }
    // Reading albums from file if loaded successfuly
    for (int i = 0; i < albumCount; ++i) {
        Album album;
        getline(file, album.artist);
        getline(file, album.name);

        string genreStr;
        getline(file, genreStr);
        album.genre = getGenreFromString(genreStr);

        file >> album.trackCount;
        file.ignore();

        for (int j = 0; j < album.trackCount; ++j) {
            Track track;
            getline(file, track.name);
            getline(file, track.path);
            album.tracks.push_back(track);
        }

        albums.push_back(album);
    }

    return albums;
}

// Function to display album details
void displayAlbums(const vector<Album>& albums) {
    for (const auto& album : albums) {
        cout << "Artist: " << "\033[1;33m" << album.artist << "\033[0m" << endl;
        cout << "Album: " << album.name << endl;
        cout << "Genre: \033[1;36m" << getGenreAsString(album.genre) << "\033[0m" << endl;
        cout << "Tracks: " << endl;
        for (size_t i = 0; i < album.tracks.size(); ++i) {
            cout << "  " << i + 1 << ". " << album.tracks[i].name << " \033[1;37m(" << album.tracks[i].path << ")\033[0m" << endl;
        }
        cout << "\033[1;34m---------------------------------------------------------------------------------\033[0m" << endl;
    }
}

// Function to play a track using an external player
void playTrack(const string& path) {
    string command = "start " + path;
    system(command.c_str());
}

int main() {
    string filePath = "albums.txt";
    vector<Album> albums = loadAlbumsFromFile(filePath);

    int option;
    do {
        cout << "Music Player Menu:" << endl;
        cout << "1. Display albums" << endl;
        cout << "2. Play a track" << endl;
        cout << "3. Exit" << endl;
        cout << "Choose an option: ";
        cin >> option;
        cin.ignore();

        if (option == 1) {
            displayAlbums(albums);
        } else if (option == 2) {
            cout << "Select album number: ";
            int albumIndex;
            cin >> albumIndex;
            cin.ignore();

            if (albumIndex > 0 && albumIndex <= albums.size()) {
                Album& album = albums[albumIndex - 1];
                cout << "Select track number: ";
                int trackIndex;
                cin >> trackIndex;
                cin.ignore();

                if (trackIndex > 0 && trackIndex <= album.tracks.size()) {
                    playTrack(album.tracks[trackIndex - 1].path);
                } else {
                    cout << "\033[1;31mInvalid track number!\033[0m" << endl;
                }
            } else {
                cout << "\033[1;31mInvalid album number!\033[0m" << endl;
            }
        }
    } while (option != 3);

    cout << "\033[1;33mSaving data, Please wait ..." << endl;
    cout << "\033[1;32mExiting the program. Goodbye!\033[0m" << endl;
    return 0;
}
