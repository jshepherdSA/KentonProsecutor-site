"""Crop press-release mugshots to portrait head-shots, keeping every face."""
import cv2, glob, os, json
from PIL import Image

APP='/Users/jasshep/projects/kenton-prosecutor site/kenton-prosecutor'
SRC=f'{APP}/public/images/press'
ORIG=f'{APP}/content/press-originals'
os.makedirs(ORIG, exist_ok=True)
cascade=cv2.CascadeClassifier(cv2.data.haarcascades+'haarcascade_frontalface_default.xml')
ASPECT=3/4            # portrait w:h
OUT_W=480             # upscaled output width per face

def faces_of(path):
    img=cv2.imread(path)
    g=cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    g=cv2.equalizeHist(g)
    f=cascade.detectMultiScale(g, scaleFactor=1.05, minNeighbors=5,
                               minSize=(int(img.shape[0]*0.25),)*2)
    return sorted([tuple(map(int,x)) for x in f], key=lambda b: b[0]), img

def crop_face(im, box):
    """Portrait crop around one face: head + shoulders, centred horizontally."""
    W,H=im.size
    x,y,w,h=box
    cx=x+w/2
    # vertical: a little above the head down to the shoulders
    top=max(0, y-h*0.55)
    bot=min(H, y+h*1.75)
    ch=bot-top
    cw=ch*ASPECT
    if cw>W:                      # narrow source: use full width
        cw=W; ch=cw/ASPECT
        top=max(0,min(top, H-ch)); bot=top+ch
    left=max(0, min(cx-cw/2, W-cw))
    return im.crop((int(left), int(top), int(left+cw), int(top+ch)))

report=[]
for path in sorted(glob.glob(f'{SRC}/*.jpg')):
    name=os.path.basename(path)
    backup=f'{ORIG}/{name}'
    if not os.path.exists(backup):
        Image.open(path).save(backup)
    boxes,_=faces_of(backup)
    im=Image.open(backup).convert('RGB')
    if not boxes:
        report.append((name,0,'no face found — left as is')); continue
    crops=[crop_face(im,b) for b in boxes]
    h=max(c.height for c in crops)
    scale=(OUT_W/crops[0].width)
    crops=[c.resize((int(OUT_W), int(OUT_W/ASPECT)), Image.LANCZOS) for c in crops]
    gap=12 if len(crops)>1 else 0
    out=Image.new('RGB',(sum(c.width for c in crops)+gap*(len(crops)-1), crops[0].height),'white')
    x=0
    for c in crops:
        out.paste(c,(x,0)); x+=c.width+gap
    out.save(path, quality=88)
    report.append((name,len(boxes),f'{out.width}x{out.height}'))
for r in report: print(f'{r[1]} face(s)  {r[2]:16s} {r[0][:58]}')
