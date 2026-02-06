function LookbookContent() {
  const images = [
    'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1839904/pexels-photo-1839904.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1898555/pexels-photo-1898555.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/2787341/pexels-photo-2787341.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&w=400',
  ];

  return (
    <div className="p-4 bg-gray-100 min-h-full">
      <div className="bg-blue-600 text-white px-3 py-2 mb-4 font-bold border-2 border-blue-800">
        📸 Lookbook Gallery
      </div>

      <div className="grid grid-cols-4 gap-4">
        {images.map((img, index) => (
          <div
            key={index}
            className="border-4 border-gray-400 bg-white p-2 hover:border-blue-600 transition-colors cursor-pointer"
            style={{
              boxShadow: '3px 3px 0 rgba(0,0,0,0.3)',
            }}
          >
            <img
              src={img}
              alt={`Lookbook ${index + 1}`}
              className="w-full h-32 object-cover"
              style={{ imageRendering: 'pixelated' }}
            />
            <div className="text-xs mt-2 font-bold text-center">
              Look_{index + 1}.jpg
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LookbookContent;
