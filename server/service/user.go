package service

import (
	"errors"
	"math/rand"
	"mime/multipart"
	"path/filepath"
	"regexp"
	"strings"
	"time"
	"web-krs/model"
	"web-krs/request"

	supabasestorageuploader "github.com/adityarizkyramadhan/supabase-storage-uploader"
	"golang.org/x/crypto/bcrypt"
)

type userService struct {
	userRepository model.UserRepository
}

func NewUserService(repo model.UserRepository) *userService {
	return &userService{userRepository: repo}
}

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func (s *userService) Register(userRequest *request.UserRequest) (*model.User, error) {
	var (
		numeric, lowerCase, upperCase, specialCharacter bool
	)

	numeric = regexp.MustCompile(`\d`).MatchString(userRequest.Password)
	lowerCase = regexp.MustCompile(`[a-z]`).MatchString(userRequest.Password)
	upperCase = regexp.MustCompile(`[A-Z]`).MatchString(userRequest.Password)
	specialCharacter = strings.ContainsAny(userRequest.Password, "!@#$%^&*()_+-=/.,:;'`?{}[|]")

	if len(userRequest.Password) < 6 {
		return nil, errors.New("Too short password")
	}

	if !numeric {
		return nil, errors.New("password need numeric character")
	}

	if !lowerCase {
		return nil, errors.New("password need lower case character")
	}

	if !upperCase {
		return nil, errors.New("password need upper case character")
	}

	if !specialCharacter {
		return nil, errors.New("password need spesial character ex !@#$%^&*()_+-=/.,:;'`?{}[|]")
	}

	if userRequest.VerifPassword != userRequest.Password {
		return nil, errors.New("Password incorrect")
	}

	hash, _ := HashPassword(userRequest.Password)

	user := &model.User{
		ProgramStudiID: userRequest.ProgramStudiID,
		Email:          userRequest.Email,
		Nama:           userRequest.Nama,
		Nim:            userRequest.Nim,
		Password:       hash,
		Role:           userRequest.Role,
	}

	user, err := s.userRepository.Create(user)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (s *userService) UserHasMatkul(id uint, userHasMatkuls *model.UserHasMatkulReq) (*model.User, error) {
	err := s.userRepository.DeleteMatkul(&model.UserHasMatkuls{}, id)
	if err != nil {
		return nil, err
	}

	addMatkul, err := s.userRepository.Update(&model.User{
		ID:      id,
		Matkuls: userHasMatkuls.Matkuls,
	})

	if err != nil {
		return nil, err
	}

	return addMatkul, err
}

func (s *userService) MatkulUser(ID int) (*model.User, error) {
	user, err := s.userRepository.ReadByID(ID)
	if err != nil {
		return nil, err
	}

	return user, nil
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

func (s *userService) CountAllUser() (int64, error) {
	user, err := s.userRepository.CountAllUser()
	if err != nil {
		return 0, err
	}

	return user, nil
}

func (s *userService) UpdateProfile(file *multipart.FileHeader, ID int, userRequest *request.UserUpdateRequest) (*model.User, error) {
	user, err := s.userRepository.ReadByID(ID)
	if err != nil {
		return nil, err
	}

	if user.Image == "" {
		link, err := s.UploadImage(file)
		if err != nil {
			return nil, err
		}
		userRequest.Image = link
	} else {
		link, err := s.UploadImage(file)
		if err != nil {
			link = user.Image
		} else {
			err := s.DeleteImage(user.ID)
			if err != nil {
				return nil, err
			}
		}
		userRequest.Image = link
	}

	newUser, err := s.userRepository.Update(&model.User{
		ID:             uint(ID),
		ProgramStudiID: userRequest.ProgramStudiID,
		Nama:           userRequest.Nama,
		Nim:            userRequest.Nim,
		Image:          userRequest.Image,
	})

	if err != nil {
		return nil, err
	}

	return newUser, nil
}

func (s *userService) Update(ID int, userRequest *request.UserUpdateJSONRequest) (*model.User, error) {
	newUser, err := s.userRepository.Update(&model.User{
		ID:             uint(ID),
		ProgramStudiID: userRequest.ProgramStudiID,
		Nama:           userRequest.Nama,
		Nim:            userRequest.Nim,
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

	user.Password, _ = HashPassword(userRequest.Password)

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

func (s *userService) UploadImage(file *multipart.FileHeader) (string, error) {
	if file == nil {
		return "", errors.New("file not found")
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
	// fmt.Println(err)
	if err != nil {
		return "", err
	}
	return link, nil
}

func (s *userService) DeleteImage(id uint) error {
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
