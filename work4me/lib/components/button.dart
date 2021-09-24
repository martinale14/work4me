import 'package:flutter/material.dart';

class Button extends StatelessWidget {
  final String? text;

  const Button({Key? key, this.text}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Material(
      color: const Color(0xFF0256FA),
      borderRadius: const BorderRadius.all(Radius.circular(100)),
      child: InkWell(
        borderRadius: const BorderRadius.all(Radius.circular(100)),
        onTap: () {},
        child: Container(
          width: 250,
          height: 70,
          alignment: Alignment.center,
          decoration: const BoxDecoration(
              borderRadius: BorderRadius.all(Radius.circular(100))),
          child: Text(
            text ?? 'Button',
            style: const TextStyle(fontSize: 28, color: Colors.white),
          ),
        ),
      ),
    );
  }
}
