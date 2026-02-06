function EditorialsContent() {
  return (
    <div className="p-6 bg-white min-h-full">
      <div className="bg-gray-800 text-white px-4 py-3 mb-6 font-bold text-2xl border-4 border-black">
        VOGUE TECH MAGAZINE
      </div>

      <div className="space-y-6">
        <article className="border-4 border-gray-400 p-4 bg-gray-50">
          <div className="flex gap-4">
            <img
              src="https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=300"
              alt="Editorial"
              className="w-48 h-48 object-cover border-2 border-black"
              style={{ imageRendering: 'pixelated' }}
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2 text-blue-900">
                THE FUTURE IS NOW
              </h2>
              <p className="text-sm leading-relaxed">
                In a world where pixels meet passion, fashion transcends the digital realm.
                Our exclusive editorial showcases the intersection of technology and style,
                bringing you the most cutting-edge designs that blur the line between virtual
                and reality. Experience the retro-futuristic aesthetic that's taking the
                fashion world by storm.
              </p>
              <div className="mt-3 text-xs text-gray-600">
                By StyleOS Magazine • Winter 2026
              </div>
            </div>
          </div>
        </article>

        <article className="border-4 border-gray-400 p-4 bg-gray-50">
          <div className="flex gap-4">
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2 text-blue-900">
                PIXEL PERFECT
              </h2>
              <p className="text-sm leading-relaxed">
                The 90s are back, but this time with a twist. We dive deep into the pixel-art
                renaissance that's captivating designers worldwide. From 8-bit inspired
                accessories to full retro computing aesthetics, discover how nostalgia is
                shaping modern fashion.
              </p>
              <div className="mt-3 text-xs text-gray-600">
                By Digital Dreams • Spring Collection
              </div>
            </div>
            <img
              src="https://images.pexels.com/photos/1839904/pexels-photo-1839904.jpeg?auto=compress&cs=tinysrgb&w=300"
              alt="Editorial"
              className="w-48 h-48 object-cover border-2 border-black"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
        </article>

        <div className="border-4 border-blue-600 p-4 bg-blue-50">
          <h3 className="font-bold text-center text-lg mb-2">COMING SOON</h3>
          <p className="text-sm text-center">
            Subscribe to our newsletter for exclusive early access to new editorials
          </p>
        </div>
      </div>
    </div>
  );
}

export default EditorialsContent;
