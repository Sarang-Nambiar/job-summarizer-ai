## JobSummarAI

### How to Run:

#### Backend:

1. **Install Required Modules:**
   - Navigate to the `backend/` directory. 📁
   - Install the required modules listed in `requirements.txt` by running:
     ```
     pip install -r requirements.txt
     ```

2. **Set Up Environment Variables:**
   - Go into the `backend/app` directory. 📂
   - Create a `.env` file if not already present.
   - Add your Claude AI API key to the `.env` file:
     ```
     API_KEY=your_api_key_here
     ```

3. **Run the Backend:**
   - After completing the above steps, execute the following command from the current directory to run the backend:
     ```
     python3 ./main.py
     ```

4. **Access the API:**
   - Once the backend is running, the API endpoints will be accessible at `https://localhost:8000`. 🚀

#### Frontend:

1. **Navigate to the Parent Directory:**
   - Go to the parent directory of the repository where the frontend files are located. 📁

2. **Initialize and Build with npm:**
   - Run the following commands in the terminal:
     ```
     npm init
     npm run build
     ```

3. **Load Extension in Chromium Browser:**
   - Once the `dist` folder appears after building, open your favorite Chromium-based browser. 🌐
   - Navigate to `chrome://extensions`.
   - If not already enabled, turn on developer mode. ⚙️
   - Click on "Load unpacked" and upload the `dist` folder. 📂
   
4. **Finalize Installation:**
   - Your JobSummarAI extension will now appear in your browser, ready for use. 🎉



