package service

import (
	"math/rand"
	"path/filepath"
	"strings"
	"time"
	"web-krs/handler"
	"web-krs/model"
	"web-krs/request"

	supabasestorageuploader "github.com/adityarizkyramadhan/supabase-storage-uploader"
	"github.com/gin-gonic/gin"
)

type userService struct {
	userRepository model.UserRepository
}

func NewUserService(repo model.UserRepository) *userService {
	return &userService{userRepository: repo}
}

func (s *userService) Register(userRequest *request.UserRequest) (*model.User, error) {
	hash, _ := handler.HashPassword(userRequest.Password)

	user := &model.User{
		Email:        userRequest.Email,
		Nama:         userRequest.Nama,
		ProgramStudi: userRequest.ProgramStudi,
		Nim:          userRequest.Nim,
		Password:     hash,
		Role:         "user",
	}

	user, err := s.userRepository.Create(user)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (s *userService) UserHasMatkul(id uint, userHasMatkuls *model.UserHasMatkulReq) (*model.User, error)  {
	
	err := s.userRepository.DeleteMatkul(&model.UserHasMatkuls{}, id)
	if err != nil {
		return nil, err
	}

	addMatkul, err := s.userRepository.Update(&model.User{
		ID: id,
		Matkuls: userHasMatkuls.Matkuls,
	})

	if err != nil {
		return nil, err
	}

	return addMatkul, err
}

func (s *userService) ReadAll() ([]*model.User, error) {
	users, err := s.userRepository.ReadAll()
	if err != nil {
		return nil, err
	}

	return users, nil
}

func (s *userService) ReadByID(ID int) (*model.User, error) {
	user, err := s.userRepository.ReadByID(ID)

	if err != nil {
		return nil, err
	}

	return user, nil
}

func (s *userService) GetByEmail(email string) (*model.User, error) {
	user, err := s.userRepository.FindByEmail(email)

	if err != nil {
		return nil, err
	}

	return user, nil
}

func (s *userService) Update(ID int, userRequest *request.UserUpdateRequest) (*model.User, error) {
	newUser, err := s.userRepository.Update(&model.User{
		ID: uint(ID),
		Nama: userRequest.Nama,
		Nim: userRequest.Nim,
		ProgramStudi: userRequest.ProgramStudi,
		Image: userRequest.Image,
	})

	if err != nil {
		return nil, err
	}

	return newUser, nil
}

func (s *userService) ForgotPassword(ID int, userRequest *request.ForgotPasswordRequest) (*model.User, error) {

	user, err := s.userRepository.ReadByID(ID)

	if err != nil {
		return nil, err
	}

	user.Password, _ = handler.HashPassword(userRequest.Password)

	user, err = s.userRepository.Update(user)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (s *userService) Delete(ID int) (*model.User, error) {
	user, err := s.userRepository.ReadByID(ID)
	if err != nil {
		return nil, err
	}

	user, err = s.userRepository.Delete(user)
	if err != nil {
		return nil, err
	}

	return user, nil
}

var supClient = supabasestorageuploader.New(
	"https://tukzxxuctboxrwrststl.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1a3p4eHVjdGJveHJ3cnN0c3RsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU3NDQwMzMsImV4cCI6MjAxMTMyMDAzM30.H4mxGUugn27HvKMlFiXktv0VAEobvFP-vl7GB-EFBAM",
	"sobat-krs-image",
)

func (s *userService) UploadImage(c *gin.Context) (string, error) {
	file, err := c.FormFile("image")
	if err != nil {
		return "", err
	}

	// generate randomString
    randomString := RandomString(5)

	// untuk mendapatkan ekstensi file
    ext := filepath.Ext(file.Filename)

	// menghasilkan nama baru dari penggabungan nama file(tanpa ekstensi) + randomString + ekstensi file
    newFilename := strings.TrimSuffix(file.Filename, ext) + randomString + ext

	// inisialisasi Filename dengan fileName baru
    file.Filename = newFilename

	link, err := supClient.Upload(file)
	if err != nil {
		return "", err
	}
	return link, nil
}

func (s *userService) DeleteImage(c *gin.Context, id uint) error {
	user, errFind := s.ReadByID(int(id))
	if errFind != nil {
		return errFind
	}

	err := supClient.Delete(user.Image)
	if err != nil {
		return err
	} 

	return nil
}

func RandomString(length int) string {
	var randomizer = rand.New(rand.NewSource(time.Now().UTC().UnixNano()))
	var letters = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")
    
	b := make([]rune, length)
    for i := range b {
        b[i] = letters[randomizer.Intn(len(letters))]
    }
    return string(b)
}