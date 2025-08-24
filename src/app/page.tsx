export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-black mb-4">
          メイ Manga AI
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Japanese manga generator featuring メイ (Mei)
        </p>
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <p className="text-lg text-black">
            🎨 Your メイ Manga AI is working!
          </p>
          <p className="text-sm text-gray-600 mt-2">
            This is a test page to verify the deployment.
          </p>
        </div>
      </div>
    </div>
  );
}
