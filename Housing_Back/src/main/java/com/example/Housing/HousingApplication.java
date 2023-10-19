package com.example.Housing;

import com.example.Housing.Entities.Photo;
import com.example.Housing.Repositories.AddressRepository;
import com.example.Housing.Repositories.PhotoRepository;
import com.example.Housing.Repositories.PropertyRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.*;

import static com.example.Housing.Controllers.PasswordController.generatePassword;

@SpringBootApplication
public class HousingApplication {

    private String loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus urna urna, mollis vitae posuere non, tempor nec risus. Etiam justo felis, sollicitudin eu viverra ultrices, porta sit amet nisi. Nunc feugiat erat vitae viverra posuere. Donec ullamcorper tortor non orci fermentum, non congue libero efficitur. In non tincidunt enim. Sed rhoncus nisl non odio gravida ullamcorper sit amet sit amet risus. Integer dictum nec ipsum id ultrices. Ut dictum sed quam eget ultricies.\n" +
            "\n" +
            "Aenean dignissim lobortis efficitur. Maecenas id auctor est. Ut id ante sed sem volutpat interdum. Proin mauris massa, dapibus sit amet blandit ut, pellentesque sed quam. Maecenas semper eleifend sem, eget feugiat erat tincidunt eget. Fusce rutrum bibendum massa, et commodo risus egestas eu. Aenean a pellentesque lectus. Integer luctus urna faucibus, hendrerit dolor quis, iaculis lacus. Curabitur pharetra purus orci, id rhoncus mauris sollicitudin sed. Suspendisse eros tortor, sagittis vel posuere eget, egestas ut neque.";

    public static void main(String[] args) {
        SpringApplication.run(HousingApplication.class, args);
    }

    @Bean
    CommandLineRunner init(PropertyRepository propertyRepository, PhotoRepository photoRepository, AddressRepository addressRepository) {
        return args -> {
            generatePassword();
            //populateDatabase(propertyRepository, photoRepository, addressRepository);
        };
    }


    /*private void populateDatabase(PropertyRepository propertyRepository, PhotoRepository photoRepository, AddressRepository addressRepository) {
        int begin = 0;
        int end = 0;
        for (int i = 0; i < 5; ++i) {
            addressRepository.save(new Address("testStreet 25", "Varna", "Coast", "Bulgaria", "9000", 43.20230700815063, 27.92398286015827));
            File dir = new File("src/main/resources/images");
            File[] directoryListing = dir.listFiles();
            if (directoryListing != null) {
                for (File child : directoryListing) {
                    try {
                        BufferedImage image = ImageIO.read(child);
                        String fileName = child.getName();

                        int index = fileName.lastIndexOf('.');
                        String extension = fileName.substring(index + 1);

                        // Convert the image to byte array
                        ByteArrayOutputStream baos = new ByteArrayOutputStream();
                        ImageIO.write(image, extension, baos);
                        byte[] byteArray = baos.toByteArray();

                        // Close the ByteArrayOutputStream
                        baos.close();
                        photoRepository.save(new Photo(byteArray));
                        end++;
                    } catch (IOException e) {
                        System.out.println(e.getMessage());
                    }
                }
            }
            else{
                System.out.println("No pictures");
                return;
            }
            var photos = photoRepository.findAll();
            if (!photos.isEmpty()) {
                Property property = new Property("Силвия Гочева",
                        "Test Housing, No_" + i, loremIpsum, addressRepository.findAll().get(i), 13.70,
                        Date.from(LocalDate.of(2023, 6, 29).atStartOfDay(ZoneId.systemDefault()).toInstant()),
                        4, null, false, getPhotosBetween(photos, begin, end));
                propertyRepository.save(property);
                System.out.println("Property " + i + " printed!");
            }
            begin = end;
        }
        System.out.println("Data saved!");
    }*/

    private Set<Photo> getPhotosBetween(List<Photo> photos, int begin, int end) {
        HashSet<Photo> result = new HashSet<>();
        for (int i = begin; i < end; ++i) {
            result.add(photos.get(i));
        }
        return result;
    }
}
