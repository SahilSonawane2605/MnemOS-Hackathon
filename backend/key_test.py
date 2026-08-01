from keyManager import getKey, rotateKey, totalKeys

print("Total Keys:", totalKeys())

print("Current:", getKey())

rotateKey()
print("After Rotate:", getKey())

rotateKey()
print("After Rotate:", getKey())