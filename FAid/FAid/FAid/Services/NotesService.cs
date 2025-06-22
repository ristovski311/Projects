using SQLite;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FAid.Services
{
    public class NotesService
    {
        static SQLiteAsyncConnection db;
        static async Task Init()
        {
            if (db != null)
                return;
            var path = Path.Combine(FileSystem.AppDataDirectory, "NotesData.db");
            db = new SQLiteAsyncConnection(path);
            db.CreateTableAsync<Note>();
        }

        public static async Task AddNote(string title, string description, DateTime timecreated)
        {
            await Init();
            var Note = new Note
            {
                Title = title,
                Description = description,
                TimeCreated = timecreated
            };

            var id = await db.InsertAsync(Note);

        }

        public static async Task RemoveNote(int id)
        {
            await Init();
            await db.DeleteAsync<Note>(id);
        }

        public static async Task<List<Note>> GetNotes()
        {
            await Init();
            var notes = await db.Table<Note>().ToListAsync();
            return notes;
        }

        public static async Task<Note> GetNote(string title)
        {
            await Init();
            var query = db.Table<Note>().Where(n => n.Title == title);
            var result = await query.ToListAsync();
            return result.FirstOrDefault();
        }

        public static void SaveNoteAsync(Note note)
        {
            if (note == null)
                return;
            db.UpdateAsync(note);
        }


    }
}
